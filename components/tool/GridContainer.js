import React from 'react';
import { Grid, Text, Spacer, Button, Image } from '@nextui-org/react';

//local imports
import { toolsList } from '../../utils/constants';

const GridContainer = ({ groupTitle, selectedItem, handleCloseModal, handleShowModal }) => {
  return (
    <Grid.Container gap={2} justify="flex-start">
      {toolsList.map(
        (item, index) =>
          item.groupTitle === groupTitle && (
            <Grid className="pl-100 " key={index} css={{ justifyItems: 'center', maxwidth: '500' }}>
              <div
                onClick={() => {
                  handleShowModal(item);
                }}
                className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white shadow-md hover:shadow-yellow-700"
                color="warning"
              >
                <div className="flex grow-0 flex-col px-1.5 py-2.5 align-middle">
                  <div className="text-center ">
                    <Image
                      src={item.logo}
                      objectFit="fill"
                      width="40%"
                      height="20%"
                      alt={item.name}
                    />
                  </div>
                  <div className="text-center">
                    {' '}
                    <Text b size={12}>
                      {item.name}
                    </Text>{' '}
                  </div>
                </div>
              </div>
              <Spacer y={0.5} x={1} />
            </Grid>
          )
      )}
      {selectedItem && (
        <div className="modalbackcolor">
          <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
            <Spacer y={0.5} />
            <div className="closeModal" onClick={handleCloseModal}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1.41421"
                  y1="1"
                  x2="19"
                  y2="18.5858"
                  stroke="#8F8F8F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="1"
                  y1="-1"
                  x2="25.8701"
                  y2="-1"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                  stroke="#8F8F8F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="modalWrapper">
              <div className="content-center justify-center">
                <Image
                  src={selectedItem.logo}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  alt={selectedItem.name}
                />
              </div>
              <Spacer y={0.5} />
              <div className="text-center">
                <Text b size={18}>
                  {selectedItem.name}
                </Text>
              </div>
              <Spacer y={0.5} />
              <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
              <Spacer y={0.5} />
              <div>
                <a className="webLink" href={selectedItem.website}>
                  <Button>Visit Website</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Grid.Container>
  );
};

export default GridContainer;
