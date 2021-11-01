import { useRouter } from "next/router";
const Details = () => {
  const router = useRouter();
  const { id, comment } = router.query;

  return (
    <>
      <h1>Post: {id}</h1>
      <h1>Comment: {comment}</h1>
    </>
  );
};

export default Details;
