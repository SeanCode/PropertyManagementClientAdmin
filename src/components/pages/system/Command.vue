<template>
  <!-- Content Header (Page header) -->
  <content-header parent="系统" child="使用说明"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class='col-md-12'>
        <div class="box box-solid">
          <div class="box-body">
            <p><strong>1. 各模块的功能<br></strong></p>
            <p><strong>首页:</strong> 展示数量总览<br></p>
            <p><strong>水电气录入:</strong></p>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录入时, 可以进行更换表操作, 但无法对节点信息进行改动, 如果要对节点进行增删操作或者绑定解除个人/机构, 请选择水电气管理。</span><br>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>按个人录入:</strong> 左边是可以通过部门结构树来找到个人, 点击即可显示个人对应的节点信息和节点所关联的水电气表信息, 也可通过左下方的节点树, 找到个人对应的节点, (该节点树只可看到一般节点和房间节点)。<br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>按机构录入:</strong> 左边是可以通过结构表来搜索或翻页找到机构, 点击即可显示对应的节点信息和节点所关联的水电气表信息, 也可通过左下方的节点树, 找到机构对应的节点, (该节点树只可看到一般节点和机构节点)。<br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>按节点录入:</strong> 左边是完整的节点树,点击即可显示对应的节点信息和节点所关联的水电气表信息。</p>
            <p><strong>水电气审核:</strong><br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>待审核:</strong>在这里, 可以看到当前从水电气录入提交、待您审核的记录, 点击通过, 回绝来操作记录。<br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>已审核:</strong>查看所有审核记录, 包括不是您审核的记录。<br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>审核历史:</strong>查看所有由您审核的记录, 不包括其他管理员审核的记录。<br></p>
            <p><strong>水电气管理:</strong><br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>个人管理:</strong>用来绑定/接触节点与用户直接的关系, 以及操作节点信息, 例如: 修改节点信息、增删节点的水电气表。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>机构管理:</strong>用来绑定/接触节点与机构直接的关系, 以及操作节点信息, 例如: 修改节点信息、增删节点的水电气表。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>高级管理:</strong>包含了部门与用户管理, 机构管理, 节点管理</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;部门与用户管理, 选择部门后, 点击设置按钮, 可以增删改部门和增删该部门下的用户。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构管理, 对机构进行增删改查</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节点管理, 选择节点后, 可以针对该节点进行添加子节点, 删除该节点(删除前请先移除其所有子节点!!!), 以及对节点复制粘贴(用于初期对节点树进行构造, 使该节点拥有多个父节点), 还可以对该节点下的所有水电气表进行操作。</p>
            <p><strong>打印:</strong><br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择后, 即刻请求后台, 拿到所有提交的记录, 生成该节点的报表, 点击打印即可。</p>
            <p><strong>统计:</strong><br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可针对个人, 机构, 节点查看水电气用量和费用占比。</p>
            <p><strong>系统:</strong><br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以增删管理员, 对管理员分配权限, 如果该管理员没有相关权限, 就无法看到对应的功能以及使用该功能, 展示时, 所有用户暂时可以看到所有功能, 但是没有权限是无法正确提交数据的。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外, 新增的管理员默认初始密码为123456, 添加后, 请立即修改密码保证系统安全, 超级管理员可以通过该页面对所有管理进行账户锁定, 密码重置。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以对水电气的默认价格进行修改。</p>
            <p><strong>门户管理:</strong><br></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;轮播图管理: 可以替换指定顺序的轮播图。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文章管理: 可以增删改查文章。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;风采管理: 可以对相册进行增删操作, 同时还可以对相册下的所有照片进行增删操作。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机构简介管理: 编辑当前所有机构的简介。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意见建议管理: 查看并且操作所有用户提出的意见和建议。</p>
            <p><strong>2. 注意事项<br></strong></p>
            <p><strong>为保证功能的正常使用和使用体验, 请使用最新版本的Chrome谷歌浏览器/firefox火狐浏览器/360浏览器, 当前最低兼容到IE9。</strong></p>
            <p><strong>在维护期间, 可能会对界面和系统安全不定期升级。</strong></p>
            <p><strong>当前处于展示阶段, 有任何意见建议请联系qq: 793690779或手机: 13164403207</strong></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'

  export default {
    components: {
      'content-header': ContentHeader
    },
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
