export default function ({ store, redirect }) {
  // Add the userAgent property to the context
  if (!store.state.auth.authentication) {
    return redirect('/login')
  }
}
