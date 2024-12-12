import { useState } from 'react'

export const useModalManager = (update) => {
  const [addModal, setAddModal] = useState(false)
  const [payModal, setPayModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [proveedor, setProveedor] = useState({})
  const [idProveedor, setIdProveedor] = useState(null)

  const proveedorSetter = (id = null, nombre = '', telefono = '') => {
    setProveedor({
      id,
      nombre,
      telefono,
    })
  }
  const openFormAdd = () => {
    setAddModal(true)
  }

  const closeForm = (bool = false) => {
    setAddModal(false)
    setEditModal(false)
    if (bool === true) {
      update()
    }
  }

  const openFormEdit = (p) => {
    proveedorSetter(p.id, p.nombre, p.telefono)
    setEditModal(true)
  }

  const openFormPay = (p) => {
    setPayModal(true)
    proveedorSetter(p.id, p.nombre, p.telefono)
  }

  const closeFormPay = (bool = false) => {
    setPayModal(false)
  }

  const openFormDelete = (id) => {
    setDeleteModal(true)
    proveedorSetter(id)
  }

  const closeFormDelete = (bool = false) => {
    setDeleteModal(false)
    if (bool === true) {
      update()
    }
  }

  const openFormShow = (id, name, cellphone) => {
    setIdProveedor(id)
    proveedorSetter(id, name, cellphone)
    setShowModal(true)
  }

  const closeFormShow = () => {
    setShowModal(false)
  }

  return {
    modals: {
      addModal,
      payModal,
      deleteModal,
      editModal,
      showModal,
    },
    proveedor,
    idProveedor,
    actions: {
      openFormAdd,
      closeForm,
      openFormEdit,
      openFormPay,
      closeFormPay,
      openFormDelete,
      closeFormDelete,
      openFormShow,
      closeFormShow,
    },
  }
}
