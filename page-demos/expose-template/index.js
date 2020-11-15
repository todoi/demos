import Promise from 'bluebird';

function getClientBoundingRect(selector, method = 'selectAll') {
    return Promise.try(() => {
        if(method === 'selectAll') {
            return Promise.map(document.querySelectorAll(selector), element => {
                let ret = getRectByElement(element);

                ret.dataset = element.dataset;

                return ret;
            });
        }
        else {
            let element = document.querySelector(selector) || {};
            let ret = getRectByElement(element);

            ret.dataset = element.dataset;

            return ret;
        }

    });
};

function getRectByElement(element) {
    let { bottom, height, left, right, top, width, x, y } = (element && element.getBoundingClientRect && element.getBoundingClientRect()) || { dataset: {} };

    return { bottom, height, left, right, top, width, x, y };
}

export default {
    methods: {
        // 模板是否在可视区
        inVisibleArea({ parent, children, callback }) {
            Promise.all([
                !parent || getClientBoundingRect(parent, 'select'),
                getClientBoundingRect(children)
            ]).then(([pRect, cRects]) => {
                pRect = pRect || { bottom: window.innerHeight, right: window.innerWidth, top: 0, left: 0 };
                let {
                    top: pTop,
                    bottom: pBottom,
                    right: pRight,
                    left: pLeft
                } = pRect;

                // 先判断父级是否可视
                if(pTop >= window.innerHeight || pBottom < 0 || pLeft >= window.innerWidth || pRight < 0) return;

                cRects.forEach((rect, index) => {
                    // 判断在可视区的海报模板
                    if(
                        rect.dataset.id &&
                        rect.bottom > pTop && rect.top < pBottom &&
                        rect.right > pLeft && rect.left < pRight
                    ) {
                        this.validateWriteCache(rect, callback);
                    }
                });
            }).catch(console.error);
        },

        // 停留超1秒记录埋点
        validateWriteCache({ dataset }, callback) {
            if(this._exposeCacheMap[dataset.id]) return;
            if(!this._secondCacheMap[dataset.id]) {
                this._secondCacheMap[dataset.id] = true;
            }
            else {
                delete this._secondCacheMap[dataset.id];
                this._exposeCacheMap[dataset.id] = true;

                callback && callback(dataset);
            }
        },
        // 开启定时器
        runAreaValidate(selector) {
            // selector = [{
            //     parent: null,
            //     children: '.item',
            //     callback: () => {}
            // }];

            clearInterval(this._validateTimer);
            this._validateTimer = setInterval(() => {
                selector.forEach(s => {
                    this.inVisibleArea(s);
                });
            }, 1000);
        },
        // 停止定时器
        stopAreaValidate() {
            clearInterval(this._validateTimer);
        },

        // 埋点曝光专题模板
        exposeTopicTemplate(lists) {
            let exposeArray = [];
            clearTimeout(this._initValidatetimer);
            lists.forEach(listData => {
                let event = 'expose';
                let parent = listData.selector;
                let children = `${parent} .c-tpl-item`;

                exposeArray.push({
                    parent: parent,
                    children: children,
                    callback: ({id, channel, templetType, labelId, index}) => {
                        this.$tracker.trackEvent(event, {
                            point_id: '11049',
                            sc_page: 'spring_festival_act_h5',
                            sc_mod: 'topic_label_' + labelId,
                            sc_pos: '' + index,
                            op_but: 'template',
                            obj_type: templetType,
                            obj_id: id + '',
                            ext1: channel
                        });

                    }
                });
            });
            this._initValidatetimer = setInterval(() => {
                exposeArray.forEach(s => {
                    this.inVisibleArea(s);
                });
            }, 1000);
        },
    }
};

    
