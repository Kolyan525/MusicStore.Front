import React, { useEffect, useState} from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query';
import axios from "axios";

const queryClient = new QueryClient();

const Song = () => {
    const [songs, setSongs] = useState([]);
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
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [album, setAlbum] = useState("")
    const [category, setCategory] = useState("")

    const [Delete, setDelete] = useState(false);
    const [id, setId] = useState("");

    const results = useQuery('get-songs', () => {
      var data = axios.get('https://localhost:44343/song');
      console.log('rQuery');
      console.log(data);
      return data;
    })

    const addSong = (song) => {
        const url = 'https://localhost:44343/song';
        return axios.post(url, song)
    }

    const editSong = (song) => {
      const url = 'https://localhost:44343/song';
      return axios.put(url, song);
    };

    
    const useAddSong = () => {
      return useMutation(addSong);
    }
    
    const {mutate:add} = useAddSong();

    const useEditSong = () => {
      return useMutation(editSong);
    }

    const {mutate:edit} = useEditSong()

    const getSongsData = () => {
        const url = 'https://localhost:44343/song';
        
        axios
          .get(url)
          .then((response) => {
              console.log(response)
            setSongs(response.data);
        });
    }

    const handleSubmit = () => {
        const url = 'https://localhost:44343/song';
        const song = { title, artist, category, album }
        console.log("Post")
        console.log(song)
        add(song)
            // .then(response => {
            //     const result = response.data;
            //     const { status, message, data } = result;
                
            //         // alert(message)
            //         // window.location.reload()
            // })
            // .catch(err => {
            //     console.log(err)
            // })
    }

    const handleEdit = () => {
        const url = `https://localhost:44343/song/`;
        const song = { id, title, artist, category, album };
        console.log('Edit');
        console.log(song, id);
        edit(song)
            // .then(response => {
            //     const result = response.data;
            //     const { status, message } = result;
            //         console.log(message, status)
            //         window.location.reload()
            // })
            // .catch(err => {
            //     console.log(err)
            // })
    }

    //handle Delete Function 
    const handleDelete = () => {
        const url = `https://localhost:44343/song/${id}`
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
        getSongsData();
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
              Add Song
            </Button>
          </div>
        </div>
        <div className='row'>
          <div className='table-responsive'>
            <table className='table table-scripted table-hover table-bordered'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th>Album</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.artist}</td>
                    <td>{item.category}</td>
                    <td>{item.album}</td>
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
              <Modal.Title>View Song</Modal.Title>
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
                    value={RowData.title}
                    readOnly
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={RowData.artist}
                    readOnly
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={RowData.category}
                    readOnly
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={RowData.album}
                    readOnly
                  />
                </div>
                {Delete && (
                  <Button
                    type='submit'
                    className='btn btn-danger mt-4'
                    onClick={handleDelete}
                  >
                    Delete Song
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
              <Modal.Title>Add Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Please enter title'
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder='Please enter artist'
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder='Please enter category'
                  />
                </div>
                <div className='form-group mt-3'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setAlbum(e.target.value)}
                    placeholder='Please enter album'
                  />
                </div>
                <Button
                  type='submit'
                  className='btn btn-success mt-4'
                  onClick={handleSubmit}
                >
                  Add Song
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
              <Modal.Title>Edit Song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <label>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Please enter title'
                    defaultValue={RowData.title}
                  // />
                  // <input
                  //   type='hidden'
                  //   className='form-control'
                  //   onChange={(e) => setId(RowData.id)}
                  //   defaultValue={RowData.id}
                  // 
                  />
                </div>
                <div className='form-group mt-3'>
                  <label>Artist</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder='Please enter artist'
                    defaultValue={RowData.artist}
                  />
                </div>
                <div className='form-group mt-3'>
                  <label>Category</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder='Please enter category'
                    defaultValue={RowData.category}
                  />
                </div>
                <div className='form-group mt-3'>
                  <label>Album</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setAlbum(e.target.value)}
                    placeholder='Please enter album'
                    defaultValue={RowData.album}
                  />
                </div>
                <Button
                  type='submit'
                  className='btn btn-warning mt-4'
                  onClick={handleEdit}
                >
                  Edit Song
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

export default Song;