const Rating = ({ rating }) => {
  const fullStar = Math.floor(rating);
  const isHalfStar = rating % 1 != 0;
  const emptyStar = 5 - fullStar - (isHalfStar ? 1 : 0);
  let stars = [];
  for (let i = 0; i < fullStar; i++) {
    stars.push(<box-icon name="star" type="solid" color="#ff9203"></box-icon>);
  }
  if (isHalfStar) {
    stars.push(
      <box-icon type="solid" name="star-half" color="#ff9203"></box-icon>
    );
  }
  for (let i = 0; i < emptyStar; i++) {
    stars.push(<box-icon name="star" color="#ff9203"></box-icon>);
  }

  return stars;
};
export default Rating;
