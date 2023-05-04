import RequestReset from '../components/RequestReset.js';
import Reset from '../components/Reset.js';

export default function resetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Shoot! No Reset token found </p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD {query.token} </p>
      <Reset token={query.token} />
    </div>
  );
}
