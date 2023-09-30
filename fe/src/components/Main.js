import React, { useEffect, useState } from 'react'
import { Modal, } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Main = () => {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const querySearch = searchParams.get('name')

  useEffect(() => {
    if (querySearch) {
      axios.get(`http://localhost:3300/services?name=${querySearch}`)
        .then((res) => {
          setIsloading(false)
          const result = res.data.data
          setProducts(result)
        })
        .catch((err) => {
          setIsloading(false)
          console.log(err.reponse);
        })
    } else {
      setIsloading(true)
      axios.get(`http://localhost:3300/services`)
        .then((res) => {
          setIsloading(false)
          const result = res.data.data
          setProducts(result)
          // console.log(res.data.data, 'ressss')
        })
        .catch((err) => {
          setIsloading(false)
          console.log(err.reponse);
        })
    }
  }, [querySearch])

  const handleSearch = (e) => {
    setTimeout(() => {
      setSearchParams({ name: e.target.value });
    }, 1000);
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    };
  };
  const [form, setForm] = useState({
    name: '',
    description: '',
    currency: '',
    price: ''
  });
  const handleOk = async (e) => {
    e.preventDefault()
    setLoading(true);
    axios
      .put(`http://localhost:3300/services/update/${id}`, form)
      .then((res) => {
        setLoading(false);
        const result = res.data.data
        setProducts([result])
        // alert(`berhasil edit`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          console.log(err);
        } else {
          alert('error');
        }
      }, []);

    setIsModalOpen(false);
    setLoading(false);
  };

  const handleOkAdd = async (e) => {
    e.preventDefault()
    setLoading(true);
    axios
      .post(`http://localhost:3300/services/add`, form)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          console.log(err);
        } else {
          alert('error');
        }
      }, []);
    setIsModalAddOpen(false);
    setLoading(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [editProduct, setEditProduct] = useState(null);
  const handleEdit = (product) => {
    setEditProduct(true);
    setForm(product);
    setId(product.id);
    setIsModalOpen(true);
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleDelete = (product) => {
    setId(product.id);
    setIsModalDeleteOpen(true);
  };
  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };
  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };
  const [id, setId] = useState(null);



  const handleOkDelete = (e) => {
    e.preventDefault()
    setLoading(true);
    axios
      .delete(`http://localhost:3300/services/delete/${id}`)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          console.log(err);
        } else {
          alert('error');
        }
      });
    setIsModalDeleteOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <div className="container py-3">

        <div className="search-receiver w-100">
          <h5>Cari Barang</h5>
          <input
            onKeyUp={handleSearch}
            placeholder='Cari...' />
        </div>
        <div className="py-3 d-flex justify-content-end">
          <button className='btn btn-sm btn-primary' type="primary" onClick={setIsModalAddOpen}>
            Tambah Item
          </button>
        </div>
        <table className="table">
          <thead className=''>
            <tr>
              <th scope="col">Nama Service</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">currency</th>
              <th scope="col">Harga</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, id) => (
              <tr key={id}>
                <th>{product.name}</th>
                <th>{product.description}</th>
                <th>{product.currency}</th>
                <th>Rp. {product.price}</th>
                <th>
                  <EditOutlined className='pe-3' onClick={() => handleEdit(product)} />
                  <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(product)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Hapus Produk?" open={isModalDeleteOpen} onOk={handleOkDelete} onCancel={handleCancelDelete}
      >
        Yakin ingin menghapus
      </Modal>
      <Modal
        title="Edit Produk" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      >
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Nama Service</label>
          <input type="text" className="form-control"
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder='Masukan Nama Service'
          />
        </div>
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Deskripsi</label>
          <input type="text" className="form-control"
            name='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Masukan Deskripsi'
          />
        </div>
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Mata Uang</label>
          <input type="text" className="form-control"
            name='currency'
            value={form.currency}
            onChange={handleChange}
            placeholder='Masukan Mata Uang'
          />
        </div>
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Harga</label>
          <input type="text" className="form-control"
            name='price'
            value={form.price}
            onChange={handleChange}
            placeholder='Masukan Harga'
          />
        </div>
      </Modal>
      <Modal
        title="Tambah Prouk" open={isModalAddOpen} onOk={handleOkAdd} onCancel={handleCancelAdd}
      >
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Nama Service</label>
          <input type="text" className="form-control"
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder='Masukan Nama Service'
          />
        </div>
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Deskripsi</label>
          <input type="text" className="form-control"
            name='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Masukan Deskripsi'
          />
        </div>
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Mata Uang</label>
          <input type="text" className="form-control"
            name='currency'
            value={form.currency}
            onChange={handleChange}
            placeholder='Masukan Mata Uang'
          />
        </div>
        <div className="input-group input-group-sm mb-3 row">
          <label className='pe-2 align-self-center col-md-3'>Harga</label>
          <input type="text" className="form-control"
            name='price'
            value={form.price}
            onChange={handleChange}
            placeholder='Masukan Harga'
          />
        </div>
      </Modal>
    </div>
  )
}

export default Main