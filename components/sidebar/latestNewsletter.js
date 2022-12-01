import PropTypes from 'prop-types';
import { memo } from 'react';
import CardRegular from '../card/card-regular';
import CardBase from '../card/card-base';
function LatestNewsletter({ data }) {
  return (
    <div>
      <CardBase key={data.SK} content={data} mode="search" editContent={() => {}} />
    </div>
  );
}

LatestNewsletter.propTypes = {
  data: PropTypes.object.isRequired
};

export default memo(LatestNewsletter);
