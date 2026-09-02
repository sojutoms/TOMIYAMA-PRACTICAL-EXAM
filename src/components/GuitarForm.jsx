import { useState } from 'react'
import shared from '../styles/shared.module.css'
import styles from './GuitarForm.module.css'

const BODY_TYPES = ['Electric', 'Acoustic', 'Bass', 'Classical']
const USER_ROLES = ['Merchant', 'Consumer']

function validateForm(values) {
  const errors = {}

  if (!values.model.trim()) {
    errors.model = 'Guitar model is required.'
  } else if (values.model.trim().length < 3) {
    errors.model = 'Guitar model must be at least 3 characters.'
  }

  if (!BODY_TYPES.includes(values.bodyType)) {
    errors.bodyType = 'Select a sub-category.'
  }

  if (!values.brand.trim()) {
    errors.brand = 'Brand/Artist is required.'
  } else if (values.brand.trim().length < 3) {
    errors.brand = 'Brand/Artist must be at least 3 characters.'
  }

  if (values.stock === '') {
    errors.stock = 'Stock quantity is required.'
  } else if (Number(values.stock) < 1 || Number(values.stock) > 100) {
    errors.stock = 'Stock quantity must be between 1 and 100.'
  }

  if (!values.manufacturer.trim()) {
    errors.manufacturer = 'Label/Company name is required.'
  } else if (values.manufacturer.trim().length < 3) {
    errors.manufacturer = 'Label/Company name must be at least 3 characters.'
  }

  if (!USER_ROLES.includes(values.userRole)) {
    errors.userRole = 'Select a user role.'
  }

  return errors
}

export default function GuitarForm({ onSubmit }) {
  const [model, setModel] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [userRole, setUserRole] = useState('')
  const [errors, setErrors] = useState({})

  function handleModelChange(e) {
    const value = e.target.value
    setModel(value)
    setErrors(validateForm({ model: value, bodyType, brand, stock, manufacturer, userRole }))
  }

  function handleBodyTypeChange(e) {
    const value = e.target.value
    setBodyType(value)
    setErrors(validateForm({ model, bodyType: value, brand, stock, manufacturer, userRole }))
  }

  function handleBrandChange(e) {
    const value = e.target.value
    setBrand(value)
    setErrors(validateForm({ model, bodyType, brand: value, stock, manufacturer, userRole }))
  }

  function handleStockChange(e) {
    const value = e.target.value
    setStock(value)
    setErrors(validateForm({ model, bodyType, brand, stock: value, manufacturer, userRole }))
  }

  function handleManufacturerChange(e) {
    const value = e.target.value
    setManufacturer(value)
    setErrors(validateForm({ model, bodyType, brand, stock, manufacturer: value, userRole }))
  }

  function handleUserRoleChange(e) {
    const value = e.target.value
    setUserRole(value)
    setErrors(validateForm({ model, bodyType, brand, stock, manufacturer, userRole: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const values = { model, bodyType, brand, stock, manufacturer, userRole }
    const validationErrors = validateForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    onSubmit({
      model: model.trim(),
      bodyType,
      brand: brand.trim(),
      stock: Number(stock),
      manufacturer: manufacturer.trim(),
      userRole,
    })

    setModel('')
    setBodyType('')
    setBrand('')
    setStock('')
    setManufacturer('')
    setUserRole('')
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className={shared.card} noValidate>
      <h2 className={shared.cardTitle}>Register New Item</h2>

      <div className={styles.formGrid}>
        <div className={`${styles.field} ${errors.model ? styles.fieldInvalid : ''}`}>
          <label htmlFor="model">Guitar Model</label>
          <input id="model" type="text" value={model} onChange={handleModelChange} />
          {errors.model && <p className={styles.fieldError}>{errors.model}</p>}
        </div>

        <div className={`${styles.field} ${errors.bodyType ? styles.fieldInvalid : ''}`}>
          <label htmlFor="bodyType">Sub-category / Genre</label>
          <select id="bodyType" value={bodyType} onChange={handleBodyTypeChange}>
            <option value="">Select sub-category</option>
            {BODY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.bodyType && <p className={styles.fieldError}>{errors.bodyType}</p>}
        </div>

        <div className={`${styles.field} ${errors.brand ? styles.fieldInvalid : ''}`}>
          <label htmlFor="brand">Brand / Artist</label>
          <input id="brand" type="text" value={brand} onChange={handleBrandChange} />
          {errors.brand && <p className={styles.fieldError}>{errors.brand}</p>}
        </div>

        <div className={`${styles.field} ${errors.stock ? styles.fieldInvalid : ''}`}>
          <label htmlFor="stock">Stock Quantity (1-100)</label>
          <input
            id="stock"
            type="number"
            min="1"
            max="100"
            value={stock}
            onChange={handleStockChange}
          />
          {errors.stock && <p className={styles.fieldError}>{errors.stock}</p>}
        </div>

        <div className={`${styles.field} ${styles.fieldSpan2} ${errors.manufacturer ? styles.fieldInvalid : ''}`}>
          <label htmlFor="manufacturer">Label / Company Name</label>
          <input id="manufacturer" type="text" value={manufacturer} onChange={handleManufacturerChange} />
          {errors.manufacturer && <p className={styles.fieldError}>{errors.manufacturer}</p>}
        </div>

        <div className={`${styles.field} ${styles.fieldSpan2} ${errors.userRole ? styles.fieldInvalid : ''}`}>
          <span className={styles.radioLabel}>User Role</span>
          <div className={styles.radioGroup}>
            {USER_ROLES.map((role) => (
              <label key={role} className={styles.radioOption}>
                <input
                  type="radio"
                  name="userRole"
                  value={role}
                  checked={userRole === role}
                  onChange={handleUserRoleChange}
                />
                {role}
              </label>
            ))}
          </div>
          {errors.userRole && <p className={styles.fieldError}>{errors.userRole}</p>}
        </div>
      </div>

      <button type="submit" className={`${shared.btn} ${shared.btnPrimary}`}>
        Submit Entry
      </button>
    </form>
  )
}
