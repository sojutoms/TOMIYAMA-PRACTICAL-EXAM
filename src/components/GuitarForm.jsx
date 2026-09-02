import { useState } from 'react'
import shared from '../styles/shared.module.css'
import styles from './GuitarForm.module.css'

const BODY_TYPES = ['Electric', 'Acoustic', 'Bass', 'Classical']
const USER_ROLES = ['Merchant', 'Consumer']

const emptyForm = {
  model: '',
  bodyType: '',
  brand: '',
  stock: '',
  manufacturer: '',
  userRole: '',
}

function validateGuitar(values) {
  const errors = {}

  if (!values.model.trim()) {
    errors.model = 'Brand Name is required.'
  } else if (values.model.trim().length < 3) {
    errors.model = 'Item name must be at least 3 characters.'
  }

  if (!BODY_TYPES.includes(values.bodyType)) {
    errors.bodyType = 'Select a sub-category.'
  }

  if (!values.brand.trim()) {
    errors.brand = 'Brand/Artist is required.'
  } else if (values.brand.trim().length < 3) {
    errors.brand = 'Brand/Artist must be at least 3 characters.'
  }

  if (values.stock === '' || values.stock === null || values.stock === undefined) {
    errors.stock = 'Stock quantity is required.'
  } else {
    const stockNum = Number(values.stock)
    if (!Number.isInteger(stockNum)) {
      errors.stock = 'Stock quantity must be a whole number.'
    } else if (stockNum < 1 || stockNum > 100) {
      errors.stock = 'Stock quantity must be between 1 and 100.'
    }
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
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(field, value) {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validateGuitar(nextValues))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateGuitar(values)
    setErrors(validationErrors)
    setTouched({
      model: true,
      bodyType: true,
      brand: true,
      stock: true,
      manufacturer: true,
      userRole: true,
    })

    if (Object.keys(validationErrors).length > 0) return

    onSubmit({
      ...values,
      model: values.model.trim(),
      brand: values.brand.trim(),
      manufacturer: values.manufacturer.trim(),
      stock: Number(values.stock),
    })

    setValues(emptyForm)
    setTouched({})
    setErrors({})
  }

  const showError = (field) => touched[field] && errors[field]

  return (
    <form onSubmit={handleSubmit} className={shared.card} noValidate>
      <h2 className={shared.cardTitle}>Register New Item</h2>

      <div className={styles.formGrid}>
        <div className={`${styles.field} ${showError('model') ? styles.fieldInvalid : ''}`}>
          <label htmlFor="model">Guitar Model</label>
          <input
            id="model"
            type="text"
            value={values.model}
            onChange={(e) => handleChange('model', e.target.value)}
          />
          {showError('model') && <p className={styles.fieldError}>{errors.model}</p>}
        </div>

        <div className={`${styles.field} ${showError('bodyType') ? styles.fieldInvalid : ''}`}>
          <label htmlFor="bodyType">Sub-category / Genre</label>
          <select
            id="bodyType"
            value={values.bodyType}
            onChange={(e) => handleChange('bodyType', e.target.value)}
          >
            <option value="">Select sub-category</option>
            {BODY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {showError('bodyType') && <p className={styles.fieldError}>{errors.bodyType}</p>}
        </div>

        <div className={`${styles.field} ${showError('brand') ? styles.fieldInvalid : ''}`}>
          <label htmlFor="brand">Brand / Artist</label>
          <input
            id="brand"
            type="text"
            value={values.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
          />
          {showError('brand') && <p className={styles.fieldError}>{errors.brand}</p>}
        </div>

        <div className={`${styles.field} ${showError('stock') ? styles.fieldInvalid : ''}`}>
          <label htmlFor="stock">Stock Quantity (1-100)</label>
          <input
            id="stock"
            type="number"
            min="1"
            max="100"
            value={values.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
          />
          {showError('stock') && <p className={styles.fieldError}>{errors.stock}</p>}
        </div>

        <div className={`${styles.field} ${styles.fieldSpan2} ${showError('manufacturer') ? styles.fieldInvalid : ''}`}>
          <label htmlFor="manufacturer">Label / Company Name</label>
          <input
            id="manufacturer"
            type="text"
            value={values.manufacturer}
            onChange={(e) => handleChange('manufacturer', e.target.value)}
          />
          {showError('manufacturer') && <p className={styles.fieldError}>{errors.manufacturer}</p>}
        </div>

        <div className={`${styles.field} ${styles.fieldSpan2} ${showError('userRole') ? styles.fieldInvalid : ''}`}>
          <span className={styles.radioLabel}>User Role</span>
          <div className={styles.radioGroup}>
            {USER_ROLES.map((role) => (
              <label key={role} className={styles.radioOption}>
                <input
                  type="radio"
                  name="userRole"
                  value={role}
                  checked={values.userRole === role}
                  onChange={(e) => handleChange('userRole', e.target.value)}
                />
                {role}
              </label>
            ))}
          </div>
          {showError('userRole') && <p className={styles.fieldError}>{errors.userRole}</p>}
        </div>
      </div>

      <button type="submit" className={`${shared.btn} ${shared.btnPrimary}`}>
        Submit Entry
      </button>
    </form>
  )
}
