export default () => ({
  api: `${
    import.meta.env.PROD
      ? `${window.location.origin}${window.ingressUrl || window.publicPath || ''}`
      : `${window.location.origin.replace(':8080', ':3000')}`
  }/api`,
  socket: import.meta.env.PROD
    ? { path: window.ingressUrl || window.publicPath ? `${window.ingressUrl || window.publicPath}/socket.io/` : '' }
    : `${window.location.origin.replace(':8080', ':3000')}`,
});
