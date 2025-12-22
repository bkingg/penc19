export default function Loading() {
  return (
    <div className="loader d-flex justify-content-center">
      <div className="spinner-border text-primary m-5" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
}
