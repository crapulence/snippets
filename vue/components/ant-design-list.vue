<template>
  <div class="standard-search-page">
    <a-card :bordered="false">
      <a-form-model :model="form" class="form">
        <a-row :gutter="12">
          <a-col :xl="8" :xxl="6">
            <a-form-model-item label="名称">
              <a-input v-model="form.name" placeholder="请输入名称" />
            </a-form-model-item>
          </a-col>
          <a-col span="24" class="mt">
            <a-button type="primary" icon="search" @click="handleSearch">搜索</a-button>
            <a-button icon="redo" @click="handleReset">重置</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <div class="mt">
        <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      </div>
      <a-table
        :rowKey="(record) => record.id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination.JSON"
        :loading="loading"
        bordered
        @change="handleTableChange"
      >
        <template slot="action" slot-scope="record">
          <a-button size="small" icon="edit" type="link" @click="handleEdit(record.id)"
            >编辑</a-button
          >
          <a-popconfirm title="确认是否删除?" @confirm="handleDelete(record.id)">
            <a-button size="small" icon="delete" type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <module-form ref="moduleForm" @ok="handleReset" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from 'vue-property-decorator';
import { cloneDeep } from 'lodash';
import PageMixin from '@/mixins/PaginationMixin';
import ModuleForm from './ant-design-form.vue';

const getList = (params: any) =>
  new Promise<any>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );

const remove = (params: any) =>
  new Promise<any>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );

@Component({
  components: {
    ModuleForm,
  },
})
export default class extends Mixins(PageMixin) {
  private defaultForm: any = {
    name: '',
  };

  private form = cloneDeep({}, this.defaultForm);

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

  private loading: boolean = false;

  @Ref('moduleForm')
  private moduleForm!: any;

  created() {
    this.getList();
  }

  getList() {
    this.loading = true;
    getList({
      ...this.pagination.query,
      ...this.form,
    })
      .then((res) => {
        this.dataSource = res.data.list;
        this.pagination.total = res.data.totalCount;
        this.pagination.pageSize = res.data.pageSize;
      })
      .catch((err: any) => {
        this.$message.error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  handleTableChange({ current, pageSize }) {
    this.pagination.current = current;
    this.pagination.pageSize = pageSize;
    this.getList();
  }

  resetPager() {
    this.pagination.current = 1;
  }

  handleSearch() {
    this.resetPager();
    this.getList();
  }

  handleReset() {
    this.resetPager();
    this.form = cloneDeep(this.defaultForm);
    this.getList();
  }

  handleAdd() {
    this.moduleForm.add();
  }

  handleEdit(id) {
    this.moduleForm.edit(id);
  }

  handleDetail(id) {
    this.moduleForm.detail(id);
  }

  handleDelete(id) {
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
.form {
  .ant-form-item:last-child {
    margin-bottom: 0;
  }

  .ant-select,
  .ant-input,
  .ant-calendar-picker {
    width: 100%;
  }
}

.mt {
  margin-top: 16px;
}
</style>
