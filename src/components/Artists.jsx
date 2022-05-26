import React, { useEffect, useState} from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import axios from "axios";

const Artist = () => {
    const [artist, setArtist] = useState([]);
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
    const [genre, setGenre] = useState("")
    const [albums, setAlbums] = useState([])

    const [Delete, setDelete] = useState(false);
    const [id, setId] = useState("");
    const getArtistsData = () => {
        const url = 'https://localhost:44343/artist';
        
        axios
          .get(url)
          .then((response) => {
              console.log(response)
            setArtist(response.data);
        });
    }

    const handleSubmit = () => {
        const url = 'https://localhost:44343/artist';
        const artist = { name, genre, albums }
        console.log("Post")
        console.log(artist)
        axios.post(url, artist)
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
        const url = `https://localhost:44343/artist/`;
        const artist = { id, name, genre, albums };
        console.log('Edit');
        console.log(artist, id);
        axios.put(url, artist)
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
        const url = `https://localhost:44343/artist/${id}`
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
        getArtistsData();
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
              Add artist
            </Button>
          </div>
        </div>
        <div className='row'>
          <div className='table-responsive'>
            <table className='table table-scripted table-hover table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Genre</th>
                  <th>Albums</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {artist.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    <td>{item.albums}</td>
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
              <Modal.Title>View Artist</Modal.Title>
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
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={RowData.genre}
                    readOnly
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='number'
                    className='form-control'
                    value={RowData.albums}
                    readOnly
                  />
                </div>
                {Delete && (
                  <Button
                    type='submit'
                    className='btn btn-danger mt-4'
                    onClick={handleDelete}
                  >
                    Delete artist
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
              <Modal.Title>Add Artist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Please enter title'
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='number'
                    className='form-control'
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder='Please enter genre'
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='string'
                    className='form-control'
                    onChange={(e) => setAlbums(e.target.value)}
                    placeholder='Please enter albums'
                  />
                </div>
                <Button
                  type='submit'
                  className='btn btn-success mt-4'
                  onClick={handleSubmit}
                >
                  Add Artist
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
              <Modal.Title>Edit Artist</Modal.Title>
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
                    placeholder='Please enter title'
                    defaultValue={RowData.id}
                  />
                </div>
                <div className='form-group mt-3'>
                  <label>Genre</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder='Please enter genre'
                    defaultValue={RowData.genre}
                  />
                </div>
                <div className='form-group mt-3'>
                  <label>Albums</label>
                  <input
                    type='int'
                    className='form-control'
                    onChange={(e) => setAlbums(e.target.value)}
                    placeholder='Please enter albums'
                    defaultValue={RowData.albums}
                  />
                </div>
                <Button
                  type='submit'
                  className='btn btn-warning mt-4'
                  onClick={handleEdit}
                >
                  Edit Artist
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

export default Artist;