export default function useAppRoutes() {
  const getProductPath = (id)=>`/product/${id}`;

  return {getProductPath};
}