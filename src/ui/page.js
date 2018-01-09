class Page {
  /**
   * 保留当前页面，跳转到应用内的某个页面，使用navigateBack可以返回到原页面
   * @param {string} url 
   */
  static navigateTo(url) {

  }

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
   * @param {int} delta 
   */
  static navigateBack(delta) {

  }
  
  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   * @param {string} url 
   */
  static redirectTo(url) {

  }

  /**
   * 获取当前的页面栈
   */
  static getCurrentPages() {

  }

  /**
   * 将页面滚动到目标位置
   * @param {int} top 
   */
  static pageScrollTo(top) {

  }
}