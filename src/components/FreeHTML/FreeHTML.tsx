import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './FreeHTML.css';

class FreeHTML extends React.Component<{}, { show: any, html: any, textarea: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      textarea: "",
      show: false,
      html: {
        __html: "<div>Este es un HTML Libre</div>"
      }
    };
  }

  public componentDidMount(){
    this.setState({
      textarea: this.state.html.__html
    });
  }

  public handleChange = (event: any) => {
    this.setState({
      textarea: event.target.value
    });
  };

  public handleCloseEditor = (key: number) => {
    const newHtml = this.state.textarea;
    this.setState({
      show: false,
      html: {
        __html: newHtml 
      }
    });
  }

  public handleDoubleClick = () => {
    this.setState({ show: true });
  }

  public render() {
    const { html } = this.state;
    const key = Math.random();
    return (
      <div className="freeHTML">
        <div onDoubleClick={this.handleDoubleClick} dangerouslySetInnerHTML={html} />
        <Modal show={this.state.show} onHide={() => this.handleCloseEditor(key)}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body><textarea id={`html-${key}`} onChange={this.handleChange} value={this.state.textarea} /></Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.handleCloseEditor(key)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}

export default FreeHTML;