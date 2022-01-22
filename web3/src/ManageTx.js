function ManageTx(props) {
  return (
    <div class="card my-4">
      <div class="card-header">
        <h4 class="text-dark">Manage Tx</h4>
      </div>
      <div class="card-body">
        <div>
          <h5 class="form-label text-start">Address: {props.address}</h5>
        </div>
        <div class="my-4">
          <h5 class="form-label text-start">Amount: {props.amount}</h5>
        </div>
        <div class="my-4">
          <h5 class="form-label text-start">
            Confirmations {props.confirmations}
          </h5>
        </div>
        <div class="d-flex">
          <button class="btn btn-primary my-2"> Approve Tx</button>
          <button class="btn btn-danger my-2 mx-3"> Revoke Tx</button>
        </div>
      </div>
    </div>
  );
}

export default ManageTx;
