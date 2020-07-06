<template>
  <div class="standard-search-page">
    <a-card :bordered="false">
      <a-form-model layout="inline" :model="form">
        <a-form-model-item label="名称">
          <a-input v-model="form.name" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" icon="search" @click="handleSearch"
            >搜索</a-button
          >
          <a-button icon="redo" @click="handleReset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
      <div class="mt">
        <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      </div>
      <a-table
        :rowKey="(record) => record.id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        bordered
        @change="handleTableChange"
      >
        <template slot="action" slot-scope="record">
          <a-button
            size="small"
            icon="edit"
            type="link"
            @click="handleEdit(record.id)"
            >编辑</a-button
          >
          <a-popconfirm
            title="确认是否删除?"
            @confirm="handleDelete(record.id)"
          >
            <a-button size="small" icon="delete" type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <module-form ref="moduleForm" @ok="handleReset" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModuleForm from './ant-design-form.vue';

const getList = (params: any) => new Promise<any>(resolve => setTimeout(() => {
  resolve()
}, 500));

const remove = (params: any) => new Promise<any>(resolve => setTimeout(() => {
  resolve()
}, 500));

interface IPaginationConfig {
  current: number;
  pageSize: number;
  showQuickJumper: boolean;
  showSizeChanger: boolean;
  totalPage: number;
  total?: number;
  size?: string;
  showTotal: (total: number, range: any[]) => string;
}

@Component({
  components: {
    ModuleForm,
  },
})
export default class extends Vue {
  private defaultForm: any = {
    name: '',
  };

  private form: any = {
    ...this.defaultForm
  };

  private columns: any[] = [
    {
      title: '操作',
      width: 180,
      scopedSlots: { customRender: 'action' },
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
  ];

  private dataSource: any[] = [];

  private defaultSearch: any = {
    page: 1,
    pageSize: 10,
  };

  private pagination: IPaginationConfig = {
    size: 'small',
    total: 0,
    current: this.defaultSearch.page,
    pageSize: this.defaultSearch.pageSize,
    showQuickJumper: true,
    showSizeChanger: true,
    totalPage: 10,
    showTotal: (total: number, range: any[]): string => {
      const current = parseInt(range[1], 10) + 1 - range[0];

      return `当前页${current}条 共${total}条 共${this.pagination.totalPage}页`;
    },
  };

  private loading: boolean = false;

  public created() {
    this.getList(this.defaultSearch);
  }

  private getList(params) {
    this.loading = true;
    getList(params)
      .then((res) => {
        const pagination = { ...this.pagination };
        pagination.total = res.data.totalCount;
        this.dataSource = res.data.list;
        this.pagination = pagination;
      })
      .catch((err: any) => {
        this.$message.error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private handleTableChange(pagination: IPaginationConfig) {
    const pager = { ...this.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.defaultSearch.pageSize = pagination.pageSize;
    this.pagination = pager;
    this.getList({
      ...this.defaultSearch,
      pageSize: pagination.pageSize,
      page: pagination.current,
      ...this.form,
    });
  }

  private resetPager() {
    this.pagination.current = this.defaultSearch.page;
  }

  private handleSearch() {
    this.resetPager();
    this.getList({
      ...this.defaultSearch,
      ...this.form,
    });
  }

  private handleReset() {
    this.resetPager();
    this.form = this.defaultForm;
    this.getList(this.defaultSearch);
  }

  private handleAdd() {
    (this.$refs.moduleForm as any).add();
  }

  private handleEdit(id) {
    (this.$refs.moduleForm as any).edit(id);
  }

  private handleDelete(id) {
    this.loading = true;
    remove({
      id,
    })
      .then((res) => {
        this.$message.success('操作成功');
        this.handleReset();
      })
      .catch((err) => {
        this.$message.error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="less" scoped>
.standard-search-page {
  & > .ant-form-item {
    &:last-child {
      margin-bottom: 0;
    }

    .ant-select,
    .ant-input,
    .ant-input-number {
      width: 250px;
    }
  }
}

.mt {
  margin-top: 16px;
}
</style>
