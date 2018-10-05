import * as React from 'react';
import ItemTypes from '../ItemTypes/ItemTypes';
import Stack from '../components/Stack/Stack';
import { Row, Col } from 'react-bootstrap';
import { getComponentRender, getComponentWidgetProps } from '../actions/componentsActions';

export const renderComponent = async (structureList: any[], properties?: any) => {
  const promiseArray = structureList.map(async (child: any, index: number) => {
    if (!child) return;
    switch (child.type) {
      case ItemTypes.BOX:
        return <div key={index}>Hola soy una box</div>;
      case "HTML":
        return <div key={index}>free</div>;
      case ItemTypes.STACK:
        const cols = (
          <Col xs={properties ? properties.colNumber : 12}>
            <Stack
              key={index}
              id={child.id}
              type={child.type}
              principal={false}
              accepts={[ItemTypes.BOX]}
            >
              {renderComponent(child.children)}
            </Stack>
          </Col>
        );
        if (properties) {
          if (properties.colNumber) {
            return cols;
          }
        }
        return <Row>{cols}</Row>;
      case "col":
        return <Row>{renderComponent(child.children, { colNumber: "3" })}</Row>;
      default:
        const component = await getComponentRender(child.type);
        const widget = await getComponentWidgetProps(child.type, "123");
        console.log(component, widget);
        return <div><div dangerouslySetInnerHTML={{ __html: component.devTags }} /><style>{component.style}</style><script>{component.code}</script><div dangerouslySetInnerHTML={{ __html: component.body }} /></div>
    };
  });


  return Promise.all(promiseArray);
};