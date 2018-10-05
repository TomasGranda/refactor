// React Imports
import * as React from 'react'

// Redux Imports
import { connect } from "react-redux";

// Bootstrap Imports
import { Panel } from 'react-bootstrap';

// Components Imports
import Box from '../Box/Box';

// Drag and Drop Imports
import ItemTypes from "../../ItemTypes/ItemTypes";

const stackImage = "iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsSAAALEgHS3X78AAABZElEQVRYw+2ZwXGDMBBFnz2+2x2YDkAXjW52ByYVxKkgTgcpgQ6COyAdcNToIlJBSAehAnLRIZMhByPEwJi9wQziaffvrhZWbdsyB1szE5sN6Ob3hZAqA5KpwFmjj52gDvKwhH4BXUA9s/4Ga4Cq57M7IA4N+gW8WqNzH+8IqSIgA06hQu8N6epjbY1O3cYHB22AosM7Ow/mPARoZY3+7rhfC6n6drNyzKzfAlZIdZ5LeXoTUuVzAAV4FFJVnrodreDHQOWh21E70x4oh9RtyBa6dbrN5tLrn4VUpa9uxzqUJEA0ddAPILJGVz6LbAJDXq3R56lr9GkoyFAebYDUGl0Oueg6gB6ToSGHBr0CR2t0PaVR5K+9WKOzkFl5C+h/dfDBGl30fH8UIvR7IVXaMVYUHo66hNLoxQ1m3uYOLHEojR6ATyHVu+e4nLoTVvBkOt0y6t7Vl5IFdAGduq2W3zf3CvoDJIpeyUewIRMAAAAASUVORK5CYII=";

class Toolbar extends React.Component<{ componentList: any[] }> {
    public render() {
        const { componentList } = this.props;
        const tableLabels = componentList.map((component: any, index: number) => {
            if (component.image) {
                return <Box key={index + 123564894891651} icon={component.image} name={component.fullName} componentType={component.name} type={ItemTypes.BOX} />
            } else {
                return;
            }
        }).filter((element: any) => element !== undefined);
        const tableRows = [];
        for (let i = 0; i < tableLabels.length; i += 2) {
            tableRows.push(<tr><td>{tableLabels[i]}</td><td>{tableLabels[i + 1]}</td></tr>);
        }
        return (
            <Panel>
                <Panel.Heading>Toolbar</Panel.Heading>
                <Panel.Body style={{ textAlign: "center" }}>
                    {tableLabels}
                    <Box icon={stackImage} name="stack" componentType={ItemTypes.STACK} type={ItemTypes.BOX} />
                    {// <Box icon={stackImage} name="col" componentType={"col"} type={ItemTypes.BOX} />
                    }
                </Panel.Body>
            </Panel>
        );
    }
}

const mapStateToProps = (state: any) => ({
    componentList: state.page.list.components
});

export default connect(mapStateToProps)(Toolbar);