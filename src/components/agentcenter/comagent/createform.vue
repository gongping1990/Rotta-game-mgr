<template>
  <div class="outcreate">
    <h2 class="title">基本信息</h2>
    <el-form :model="merchantInfo" :rules="rules" ref="merchantInfo" class="createform" label-width="120px" label-position="right">
        <el-form-item label="商户标识" prop="suffix">
          <el-input v-model="merchantInfo.suffix" class="input" placeholder="请输入"></el-input>
        </el-form-item>
          <el-form-item label="商户昵称" prop="displayName">
            <el-input v-model="merchantInfo.displayName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商户抽成比" prop="rate">
            <el-input v-model="merchantInfo.rate" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商户邮箱" prop="merchantEmail">
            <el-input v-model="merchantInfo.merchantEmail" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商户负责人" prop="hostName">
            <el-input v-model="merchantInfo.hostName" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="负责人联系方式" prop="hostContact">
            <el-input v-model="merchantInfo.hostContact" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属线路商">
            <el-select v-model="merchantInfo.parent" placeholder="请选择" clearable class="input">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input v-model="merchantInfo.remark" placeholder="请输入备注,最多不超过200个字符" type="textarea" :rows="3" class="input" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="">
            <el-date-picker v-model="merchantInfo.contractPeriod" type="daterange" placeholder="选择生效时间" class="input" label="生效时间" :editable='false'></el-date-picker><el-checkbox v-model="merchantInfo.isforever" class="isforever">永久</el-checkbox>
          </el-form-item>
    </el-form>
  <div class="stepbtn">
    <el-button type="primary" class="nextBtn" @click="postCreateform">下一步</el-button>
    <el-button @click="resetData">重置</el-button>
  </div>
</div>
</template>

<script>
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
      data: 'createcom'
    })
    this.$store.commit('resetCreatecom')
    this.$store.dispatch('getParent')
  },
  computed: {
    options () {
      var nowOption = this.$store.state.formparent
      nowOption.push({
        label: '直属',
        value: ''
      })
      return nowOption
    }
  },
  data () {
    var validateSuffix = (rule, value, callback) => {
      var str = new RegExp(/^[a-zA-Z]/)
      if (value === '') {
        callback(new Error('请输入商户标识'))
      } else if (!str.exec(value.slice(0, 1))) {
        callback(new Error('商户标识必须以字母开头'))
      } else {
        callback()
        this.isfinish.suffix = true
        // console.log(this.isfinish)
      }
    } // 验证商户标识
    var validateDispalyName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商户昵称'))
      } else {
        callback()
        this.isfinish.displayName = true
        // console.log(this.isfinish)
      }
    } // 验证商户昵称
    var validateEmail = (rule, value, callback) => {
      var email = new RegExp(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/)
      if (value === '') {
        callback(new Error('请输入商户邮箱'))
      } else if (!email.exec(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
        this.isfinish.Email = true
        // console.log(this.isfinish)
      }
    } // 验证邮箱
    var validateRate = (rule, value, callback) => {
      var num = new RegExp(/^[0-9]*$/)
      if (value === '') {
        callback(new Error('请输入商户抽成比'))
      } else if (!num.test(value)) {
        callback(new Error('请输入正确的抽成比'))
      } else if (value.toString().length > 1 && value.toString().slice(0, 1) === '0') {
        callback(new Error('请输入正确的抽成比'))
      } else if (value < 0 || value > 100) {
        callback(new Error('抽成比应为0~100之间的数字'))
      } else {
        callback()
        this.isfinish.rate = true
        // console.log(this.isfinish)
      }
    } // 验证抽成比
    var validateHostName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入负责人姓名'))
      } else {
        callback()
        this.isfinish.hostName = true
        // console.log(this.isfinish)
      }
    } // 验证负责人姓名
    var validateHostContact = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入负责人联系方式'))
      } else {
        callback()
        this.isfinish.hostContact = true
        // console.log(this.isfinish)
      }
    } // 验证负责人联系方式
    return {
      isfinish: {
        suffix: false,
        displayName: false,
        rate: false,
        Email: false,
        hostName: false,
        hostContact: false,
        contractPeriod: false
      }, // 检查信息是否填写完毕
      merchantInfo: {
        suffix: '', // 商户标识
        displayName: '', // 商户昵称
        rate: '', // 商户抽成比
        merchantEmail: '', // 商户邮箱
        hostName: '', // 负责人
        hostContact: '', // 负责人联系方式
        parent: '', // 所属代理商
        remark: '', // 备注
        contractPeriod: [], // 生效时间
        isforever: false // 是否永久有效
      },
      rules: {
        suffix: [
          {validator: validateSuffix, trigger: 'blur'}
        ],
        displayName: [
          {validator: validateDispalyName, trigger: 'blur'}
        ],
        rate: [
          {validator: validateRate, trigger: 'blur'}
        ],
        merchantEmail: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        hostName: [
          {validator: validateHostName, trigger: 'blur'}
        ],
        hostContact: [
          {validator: validateHostContact, trigger: 'blur'}
        ]
      } // 列表验证规则
    }
  },
  methods: {
    postCreateform () {
      if (this.merchantInfo.contractPeriod[0] !== null && this.merchantInfo.contractPeriod[0] !== null) {
        this.isfinish.contractPeriod = true
      }
      if (this.merchantInfo.parent === '') {
        delete this.merchantInfo.parent
      }
      if (this.isfinish.suffix === false || this.isfinish.displayName === false || this.isfinish.rate === false || this.isfinish.Email === false && this.isfinish.hostName === false || this.isfinish.hostContact === false || this.isfinish.contractPeriod === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        this.$store.commit({
          type: 'recordCreatecom',
          data: this.merchantInfo
        })
        this.$store.dispatch('getchangecomActive')
      }
    },
    resetData () {
      this.merchantInfo = {
        suffix: '', // 商户标识
        displayName: '', // 商户昵称
        rate: '', // 商户抽成比
        merchantEmail: '', // 商户邮箱
        hostName: '', // 负责人
        hostContact: '', // 负责人联系方式
        parent: '', // 所属代理商
        remark: '', // 备注
        contractPeriod: [], // 生效时间
        isforever: false // 是否永久有效
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createform{width:45.5rem;margin: 0 auto;}
.input{width: 28rem;}
.title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -40rem}
.isforever{margin-left: 0.5rem}
.stepbtn{text-align: center}
.nextBtn{margin-right: 13.2rem}
</style>
