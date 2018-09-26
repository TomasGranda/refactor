import * as React from 'react'
import { Panel, Table } from 'react-bootstrap';

import Box from '../Box/Box';

import ItemTypes from "../../ItemTypes/ItemTypes";

class Toolbar extends React.Component {
  public render() {
    return (
      <Panel>
        <Panel.Heading>Toolbar</Panel.Heading>
        <Panel.Body>
          <Table bordered={true} style={{ textAlign: "center" }}>
            <tbody>
            <tr>
                <td>
                  <i className="fab fa-html5" />
                </td>
                <td>
                  <Box name="test" type={ItemTypes.BOX} />
                </td>
                <td>
                  <Box name="test2" type={ItemTypes.FREEHTML} />
                </td>
                <td>
                  6
                </td>
              </tr>
              <tr>
                <td>
                  3
                </td>
                <td>
                  4
                </td>
                <td>
                  5
                </td>
                <td>
                  7
                </td>
              </tr>
            </tbody>
          </Table>
        </Panel.Body>
      </Panel>
    );
  }
}

export default Toolbar;