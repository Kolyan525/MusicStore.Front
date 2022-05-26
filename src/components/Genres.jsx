import React, { useEffect, useState} from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import axios from "axios";

const Genre = () => {
    const [genre, setGenre] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const handleViewClose = () => { SetViewShow(false) }

    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const handlePostClose = () => { SetPostShow(false) }

    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const handleEditClose = () => { SetEditShow(false) }

    //Local state that stores the form Data
    const [name, setName] = useState("")

    const [Delete, setDelete] = useState(false);
    const [id, setId] = useState("");
    const getGenresData = () => {
        const url = 'https://localhost:44343/genre';
        
        axios
          .get(url)
          .then((response) => {
              console.log(response)
            setGenre(response.data);
        });
    }

    const handleSubmit = () => {
        const url = 'https://localhost:44343/genre';
        const genre = { name }
        console.log("Post")
        console.log(genre)
        axios.post(url, genre)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                
                    // alert(message)
                    window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleEdit = () => {
        const url = `https://localhost:44343/genre/`;
        const genre = { id, name };
        console.log('Edit');
        console.log(genre, id);
        axios.put(url, genre)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                    console.log(message, status)
                    window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    //handle Delete Function 
    const handleDelete = () => {
        const url = `https://localhost:44343/genre/${id}`
        console.log('Delete');
        console.log(id);
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                
                  window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log("Pre Use effect");
    console.log(ViewShow, RowData);
    useEffect(() => {
        console.log("Use Effect");
        console.log(ViewShow, RowData);
        getGenresData();
    }, [])

    return (
      <div>
        <div className='row'>
          <div className='mt-5 mb-4'>
            <Button
              variant='primary'
              onClick={() => {
                handlePostShow();
              }}
            >
              <i className='fa fa-plu'></i>
              Add Genre
            </Button>
          </div>
        </div>
        <div className='row'>
          <div className='table-responsive'>
            <table className='table table-scripted table-hover table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {genre.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td style={{ minWidth: 190 }}>
                      <ButtonGroup aria-label='Basic example'>
                        <Button
                          size='sm'
                          variant='outline-primary'
                          onClick={() => {
                            handleViewShow(SetRowData(item));
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size='sm'
                          variant='outline-warning'
                          onClick={() => {
                            handleEditShow(SetRowData(item), setId(item.id));
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size='sm'
                          variant='outline-danger'
                          onClick={() => {
                            handleViewShow(
                              SetRowData(item),
                              setId(item.id),
                              setDelete(true)
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='model-box-view'>
          <Modal
            show={ViewShow}
            onHide={handleViewClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>View Genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    value={RowData.id}
                    readOnly
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={RowData.name}
                    readOnly
                  />
                </div>
                {Delete && (
                  <Button
                    type='submit'
                    className='btn btn-danger mt-4'
                    onClick={handleDelete}
                  >
                    Delete Genre
                  </Button>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleViewClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className='model-box-view'>
          <Modal
            show={ViewPost}
            onHide={handlePostClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Please enter name'
                  />
                </div>
                <Button
                  type='submit'
                  className='btn btn-success mt-4'
                  onClick={handleSubmit}
                >
                  Add Genre
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handlePostClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className='model-box-view'>
          <Modal
            show={ViewEdit}
            onHide={handleEditClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Please enter name'
                    defaultValue={RowData.name}
                  />
                  <input
                    type='hidden'
                    className='form-control'
                    onChange={(e) => setId(RowData.id)}
                    placeholder='Please enter name'
                    defaultValue={RowData.id}
                  />
                </div>
                <Button
                  type='submit'
                  className='btn btn-warning mt-4'
                  onClick={handleEdit}
                >
                  Edit Genre
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleEditClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
}

export default Genre;