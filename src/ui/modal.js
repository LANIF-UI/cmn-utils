class Modal {
  /**
   * 显示消息提示框
   * options: 
   *   - title	  string	是	提示的内容	
   *   - icon	    string	否	图标，有效值 "success", "loading"	
   *   - image	  string	否	自定义图标的本地路径，image 的优先级高于 icon
   *   - duration	int	    否	提示的延迟时间，单位毫秒，默认：1500	
   *   - mask	    boolean	否	是否显示透明蒙层，防止触摸穿透，默认：false
   * @param {*} options 
   */
  static showToast(options) {

  }

  /**
   * 隐藏消息提示框
   */
  static hideToast() {

  }

  /**
   * 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框
   * options:
   *   - title	string	是	提示的内容
   *   - mask	  boolean	否	是否显示透明蒙层，防止触摸穿透，默认：false
   * @param {*} options 
   */
  static showLoading(options) {

  }

  /**
   * 隐藏 loading 提示框
   */
  static hideLoading() {

  }

  /**
   * ​显示模态弹窗
   * options: 
      - title	        string	  是	提示的标题
      - content	    string|node	是	提示的内容
      - showCancel	  boolean	  否	是否显示取消按钮，默认为 true
      - cancelText	  string	  否	取消按钮的文字，默认为"取消"，最多 4 个字符
      - cancelColor	  hexcolor	否	取消按钮的文字颜色，默认为"#000000"
      - confirmText	  string	  否	确定按钮的文字，默认为"确定"，最多 4 个字符
      - confirmColor	hexcolor	否	确定按钮的文字颜色，默认为"#3CC51F"
   * @param {*} options 
   */
  static showModal(options) {

  }
}