const { default: Swal } = require("sweetalert2");

const onSuccess = ({ title, after, before }) => {
  if (typeof before == "function") before();
  Swal.fire({
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
  if (typeof after == "function") after();
};

export default onSuccess;
