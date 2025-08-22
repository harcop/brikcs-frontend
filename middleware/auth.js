export default function ({ store, redirect }) {
  // Add the userAgent property to the context
  if (!store.state.authenticated) {
    return redirect('/')
  }
}
