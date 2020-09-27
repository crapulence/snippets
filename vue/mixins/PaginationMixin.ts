import { Component, Vue } from 'vue-property-decorator';
import { isInteger } from 'lodash';

interface IPaginationQuery {
    page?: number;
    pageSize?: number;
}

export interface IPaginationMixin {
    pagination: IPagination;
}

// HTTP 请求返回的翻页信息
interface ResponsePagination {
    page: number;
    totalCount: number;
    pageSize: number;
}

export interface IPagination {
    current: number; // 当前页
    pageSize: number; // 每页数量
    total: number; // 数据总数
    hasMore: boolean; // 是否还有更多数据 (是否有下一页)
    defaults: typeof defaults; // 默认的翻页

    reset(): void; // 重置翻页
    update(params: ResponsePagination): void; // 更新
    updateDefaults(params: typeof defaults): void; // 更新默认的翻页

    // 用以发送 HTTP 请求，例如 ?page=1&pageSize=10
    query: IPaginationQuery;
    // 用于 Vue Ant Design Pagination 翻页组件
    JSON: {
        current: number;
        pageSize: number;
        total: number;
        showQuickJumper: boolean;
        showSizeChanger: boolean;
        showTotal(total: number, range: number): string;
    };
}

const defaults = { current: 1, pageSize: 10 };

function definedPagination(current: number, pageSize: number): IPagination {
    let defaultPagination = { ...defaults };
    const target = {
        current,
        pageSize,
        total: 0
    } as IPagination;

    Object.defineProperty(target, 'defaults', {
        get() {
            return { ...defaultPagination };
        }
    });

    Object.defineProperty(target, 'hasMore', {
        get() {
            return target.current * target.pageSize < target.total;
        }
    });

    Object.defineProperty(target, 'query', {
        get() {
            return {
                page: target.current,
                pageSize: target.pageSize
            };
        }
    });

    Object.defineProperty(target, 'reset', {
        get() {
            return function() {
                target.current = defaultPagination.current;
                target.pageSize = defaultPagination.pageSize;
                target.total = 0;
            };
        }
    });

    Object.defineProperty(target, 'update', {
        get() {
            return function(params: ResponsePagination) {
                target.current = params.page;
                target.pageSize = params.pageSize;
                target.total = params.totalCount;
            };
        }
    });

    Object.defineProperty(target, 'updateDefaults', {
        get() {
            return function(params: typeof defaults) {
                defaultPagination = { ...params };
            };
        }
    });

    Object.defineProperty(target, 'JSON', {
        get() {
            return {
                current: target.current,
                pageSize: target.pageSize,
                total: target.total,
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal(total: number, range: number) {
                    const _totalPage = total / this.pageSize;

                    let totalPage = _totalPage;

                    if (!isInteger(_totalPage)) {
                        totalPage = parseInt(_totalPage + '', 10) + 1;
                    }

                    const isLastPage = target.current === totalPage;

                    const currentSize =
                        total < pageSize
                            ? total
                            : isLastPage
                            ? total - (target.current - 1) * target.pageSize
                            : target.pageSize;

                    return `当前页${currentSize}条 共${total}条 共${totalPage}页`;
                }
            };
        }
    });

    return target;
}

/**
 * 动态表单项组件的混入
 */
@Component({})
export default class PaginationMixin extends Vue implements IPaginationMixin {
    public pagination = definedPagination(defaults.current, defaults.pageSize) as IPagination;
}
