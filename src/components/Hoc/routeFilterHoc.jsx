
export default (WrappedComponent) => {
  console.info('首次访问路由拦截是否已登录');

  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  };
};
