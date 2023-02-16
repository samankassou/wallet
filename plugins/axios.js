export default function ({ $axios, $auth, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      $auth.logout();
      console.log("redirect");
      //redirect('/login')
    }
  });
}
