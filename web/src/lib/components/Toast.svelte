<script>
  import { ToastContainer, FlatToast } from "svelte-toasts";
</script>

<ToastContainer showProgress placement="top-right" let:data>
  <FlatToast {data}></FlatToast>
</ToastContainer>
