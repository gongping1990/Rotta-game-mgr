<template>
  <div class="outcreate">
    <h2 class="title">运营商信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
      <el-form-item label="运营商名称" prop="companyName">
        <el-input v-model="managerInfo.companyName" class="input" placeholder="请输入" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="运营商描述" prop="companyDesc">
        <el-input v-model="managerInfo.companyDesc" class="input" type="textarea" placeholder="请输入" :maxlength='200'></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="companyContact">
        <el-input v-model="managerInfo.companyContact" class="input" placeholder="请输入" :maxlength='16'></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="companyContactWay">
        <el-input v-model="managerInfo.companyContactWay" type="number" class="input" placeholder="请输入" :maxlength='20'></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱（重要）" prop="companyEmail">
        <el-input v-model="managerInfo.companyEmail" class="input" placeholder="请输入" :maxlength='20'></el-input>
      </el-form-item>
    </el-form>
    <h2 class="title">合同信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
      <el-form-item label="所属区域" prop="companyRegion">
        <el-select v-model="managerInfo.companyRegion" placeholder="请选择" clearable class="input">
          <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="合同上传" prop="companyContract">-->
      <!--<el-upload-->
      <!--class="upload-demo"-->
      <!--action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--:on-preview="handlePreview"-->
      <!--:on-remove="handleRemove"-->
      <!--:file-list="fileList">-->
      <!--<el-button size="small" type="primary">点击上传</el-button>-->
      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <!--</el-upload>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="上传执照" prop="companyContract">-->
      <!--<el-upload-->
      <!--class="img-upload"-->
      <!--action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--list-type="picture-card"-->
      <!--:on-preview="handlePictureCardPreview"-->
      <!--:on-remove="handleRemove">-->
      <!--<i class="el-icon-plus"></i>-->
      <!--</el-upload>-->
      <!--<el-dialog v-model="dialogVisible" size="tiny">-->
      <!--<img width="100%" :src="dialogImageUrl" alt="">-->
      <!--</el-dialog>-->
      <!--</el-form-item>-->
      <el-form-item label="类型" prop="remark">
        <el-input v-model="managerInfo.remark" class="input" placeholder="请输入" type="textarea" :maxlength='200'></el-input>
      </el-form-item>
    </el-form>
    <div class="stepbtn">
      <el-button type="primary" class="nextBtn" @click="postCreateform">下一步</el-button>
      <el-button @click="resetData">重置</el-button>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'

  export default {
    name: 'createform',
    beforeCreate () {
      this.$store.commit('resetSearchID')
      localStorage.removeItem('userID')
      this.$store.commit({
        type: 'returnToken',
        data: localStorage.token
      })
      this.$store.commit({
        type: 'getNowSearchIndex',
        data: 'addOperator'
      }) // 定位到创建代理商页
    },
    data () {
      var validateCompanyName = (rule, value, callback) => {
        var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入运营商名称'))
        } else if (!regName.exec(value)) {
          callback(new Error('请输入中英文或者数字'))
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyName = true
        }
      } // 运营商名称
      var validateCompanyDesc = (rule, value, callback) => {
        if (value && value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.companyDesc = false
        } else {
          callback()
          this.isfinish.companyDesc = true
        }
      } // 运营商描述
      var validateCompanyEmail = (rule, value, callback) => {
        var email = new RegExp(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/)
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!email.exec(value)) {
          callback(new Error('邮箱格式不对'))
        } else {
          callback()
          this.isfinish.companyEmail = true
        }
      } // 验证邮箱
      var validateCompanyContactWay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'))
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyContactWay = true
        }
      } // 联系方式
      var validateCompanyContact = (rule, value, callback) => {
        var reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
        if (value === '') {
          callback(new Error('请输入联系人'))
        } else if (!reg.exec(value)) {
          callback(new Error('请输入中英文或者数字'))
        } else if (value.length < 2) {
          callback(new Error('必须为两位数'))
        } else {
          callback()
          this.isfinish.companyContact = true
        }
      } // 联系人
      var validateCompanyRegion = (rule, value, callback) => {
        console.log(value, 'value validateCompanyRegion')
        if (value === '') {
          callback(new Error('请选择所属区域'))
        } else {
          callback()
          this.isfinish.companyRegion = true
        }
      } // 选择所属区域
      var validateCompanyContract = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请上传合同'))
        } else {
          callback()
          this.isfinish.companyContract = true
        }
      } // 验证负责人联系方式
      var validateRemark = (rule, value, callback) => {
        if (value && value.length < 2) {
          callback(new Error('必须为两位数'))
          this.isfinish.remark = false
        } else {
          callback()
          this.isfinish.remark = true
        }
      } // 类型
      return {
        isfinish: {
          companyName: false,
          companyDesc: true, // 不是必填  所以默认为true
          companyContactWay: false,
          companyContact: false,
          companyEmail: false,
          companyRegion: false,
          companyContract: false,
          remark: true, // 不是必填  所以默认为true
          license: false
        },
        managerInfo: {
          companyName: '', // 运营商名称
          companyDesc: '', // 运营商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyRegion: '', // 所属区域
          companyContract: '', // 合同
          license: '', // 执照
          remark: '' // 类型
        }, // 创建列表
        rules: {
          companyName: [
            {validator: validateCompanyName, trigger: 'blur'}
          ],
          companyDesc: [
            {validator: validateCompanyDesc, trigger: 'blur'}
          ],
          companyContactWay: [
            {validator: validateCompanyContactWay, trigger: 'blur'}
          ],
          companyEmail: [
            {validator: validateCompanyEmail, trigger: 'blur'}
          ],
          companyRegion: [
            {validator: validateCompanyRegion, trigger: 'blur'}
          ],
          companyContract: [
            {validator: validateCompanyContract, trigger: 'blur'}
          ],
          companyContact: [
            {validator: validateCompanyContact, trigger: 'blur'}
          ],
          remark: [
            {validator: validateRemark, trigger: 'blur'}
          ]
        }, // 列表验证规则
        regionOptions: [
          {
            label: '亚太',
            value: '1'
          }, {
            label: '大陆',
            value: '2'
          }, {
            label: '港澳台',
            value: '3'
          }, {
            label: '欧洲',
            value: '4'
          }, {
            label: '美洲',
            value: '5'
          }
        ]
      }
    },
    computed: {
    },
    methods: {
      postCreateform () {
        if (this.isfinish.companyName === false || this.isfinish.companyEmail === false || this.isfinish.companyDesc === false ||
          this.isfinish.companyContactWay === false || this.isfinish.remark === false ||
          this.isfinish.companyContact === false || !this.managerInfo.companyRegion) {
          this.$message({
            message: '请完善创建信息',
            type: 'error'
          })
        } else {
          this.$store.commit('startLoading')
          invoke({
            url: this.$store.state.isapi.addCompanyNew.url,
            method: this.$store.state.isapi.addCompanyNew.method,
            data: this.managerInfo
          }).then((data) => {
            let [err, res] = data
            console.log(err, res)
            if (err) {
              console.log('err', err.response.data)
              this.$message({
                message: err.response.data.err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$store.commit({
                type: 'getSuccessOperator',
                data: res.data.payload
              })
              this.$store.dispatch('getchangeoutActive')
            }
            this.$store.commit('closeLoading')
          })
        }
      },
      resetData () {
        this.managerInfo = {
          companyName: '', // 运营商名称
          companyDesc: '', // 运营商描述
          companyContactWay: '', // 联系方式
          companyContact: '', // 联系人
          companyEmail: '', // 邮箱
          companyRegion: '', // 所属区域
          companyContract: '', // 合同
          license: '', // 执照
          remark: '' // 类型
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*创建代理商列表*/
  .outcreate{margin-bottom: 10rem}
  .createform{width:52.5rem;margin: 0 auto;}
  .input{width: 28rem;}
  .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -35rem}
  .isforever{margin-left: 0.5rem}
  .stepbtn{text-align: center;}
  .nextBtn{margin-right: 13.2rem}
  .img-upload .el-upload-list--picture-card{width: 20px}
</style>
