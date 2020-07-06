<template>
  <div class="module-form">
    <a-modal
      v-model="visible"
      :title="modalTitle"
      :width="640"
      :maskClosable="false"
      :confirmLoading="loading"
      :afterClose="resetModal"
      @ok="handleSubmit"
      destroyOnClose
    >
      <a-spin :spinning="loading">
        <a-form-model
          ref="form"
          class="form"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入名称" />
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ModalType } from '@/util/enum';

const add = (params: any) => new Promise<any>(resolve => setTimeout(() => {
  resolve()
}, 500));

const edit = (params: any) => new Promise<any>(resolve => setTimeout(() => {
  resolve()
}, 500));

const getDetail = (params: any) => new Promise<any>(resolve => setTimeout(() => {
  resolve()
}, 500));

@Component
export default class extends Vue {
  private loading: boolean = false;
  private visible: boolean = false;
  private modalType: ModalType = 0;
  private modalTitle: string =
    this.modalType === ModalType.Edit ? '编辑' : '新增';

  private labelCol = {
    span: 4,
  };

  private wrapperCol = {
    span: 18,
  };

  private defaultForm = {
    name: '',
  };
  
  private form: any = {
    ...this.defaultForm,
  };

  private rules: any = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  };

  public add() {
    this.resetModal();
    this.modalType = ModalType.Add;
    this.visible = true;
  }

  public edit(id) {
    this.modalType = ModalType.Edit;
    this.visible = true;
    this.getDetail(id);
  }

  private resetModal() {
    this.form = {
      ...this.defaultForm,
    };
    this.loading = false;
  }

  private getDetail(id) {
    this.loading = true;
    getDetail({
      id,
    })
      .then((res) => {
        this.form = {
          ...this.form,
          ...res.data,
        };
      })
      .catch((err) => {
        this.$message.error(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private handleSubmit() {
    (this.$refs.form as any).validate((valid: any) => {
      if (!valid) {
        this.$message.error('请检查填写项');
      } else {
        const api =
          this.modalType === ModalType.Edit ? edit : add;

        this.loading = true;
        api({
          ...this.form,
        })
          .then(res => {
            this.$message.success('操作成功');
            this.visible = false;
            this.$emit('ok');
          })
          .catch((err) => {
            this.$message.error(err.message);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    });
  }
}
</script>

<style lang="less" scoped>
.form {
  .ant-input-number {
    width: 100%;
  }
}
</style>
