<template>
  <div class="upload">
    <el-upload
      multiple
      action="http://filemanager.ztbory.com/v1/file/fileupload/"
      list-type="picture-card"
      :data="dataObj"
      :headers="headerObj"
      name="files"
      :beforeUpload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :file-list="imageArr"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :limit="uploadLimit"
      :on-exceed="onExceed"
      ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
let token = localStorage.getItem("token"); // 获取token
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    mkdir: {
      type: String,
      default: "qualification"
    },
    uploadLimit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      dataObj: {
        mkdir: "qualification" //测试用 qianlei
      },
      imageArr: [],
      urlString: "",
      dialogVisible: false,
      dialogImageUrl: "",
      headerObj: {
        // Authorization: `Token ${token}`,
        // "Content-Type": "multipart/form-data"
      }
    };
  },
  watch: {
    imageUrl: {
      handler(newName, oldName) {
        // console.log(newName, 1, this.urlString);
        if (newName != this.urlString || !newName) {
          this.urlString = newName;
          this.imageUrl = newName;
          this.init();
        }
      },
      immediate: true,
      deep: true
    },
    mkdir: {
      handler(newName, oldName) {
        this.dataObj.mkdir = newName;
      },
      immediate: true
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    clearFiles() {
      this.$refs["upload"].clearFiles();
    },
    onSuccess(response, file, fileList) {
      let urlArr = [];
      fileList.forEach(item => {
        if (item.response) {
          urlArr.push(item.response.data);
        } else {
          urlArr.push(item.url);
        }
      });
      this.urlString = urlArr.join(",");
      this.$emit("uploadSuccess", urlArr);
    },
    onRemove(file, fileList) {
      this.imageArr = fileList;
      let arr = fileList.map(o => o.url);
      this.urlString = arr.join(",");
      this.$emit("uploadSuccess", arr);
    },
    //文件超出个数限制时的钩子
    onExceed() {
      this.$message.warning(`最多上传${this.uploadLimit}张图片`);
    },
    onChange(file, fileList) {
      // console.log(file, fileList);
    },
    init() {
      if (this.imageUrl) {
        let arr = this.imageUrl.split(",");
        this.imageArr = arr.map(o => {
          return {
            url: o
          };
        });
      } else {
        this.imageArr = [];
      }
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过5MB!");
        return false;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.upload >>> .el-upload--picture-card {
  width: 100px;
  height: 100px;
  border: 1px dashed #13c3c7;
}
.upload >>> .el-upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.upload >>> .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
  /* line-height: 100px; */
}
.upload >>> .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.upload >>> .avatar {
  width: 100px;
  height: 100px;
}
</style>
