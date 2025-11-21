// =====================================
// FILE: src/components/ui-elements/Form/FormFields.jsx
// MoonBet Reusable Form Components
// Mobile-first, Glass Morphism, Fully Responsive
// =====================================

import React, { useState, useRef, useEffect } from 'react';
import './FormFields.css';

// ============================================
// ICON COMPONENTS
// ============================================

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ============================================
// FORM CONTAINER
// ============================================

export const Form = ({ children, onSubmit, className = '', ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form 
      className={`moonbet-form ${className}`}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
};

// ============================================
// FORM GROUP WRAPPER
// ============================================

export const FormGroup = ({ children, className = '', ...props }) => {
  return (
    <div className={`form-group ${className}`} {...props}>
      {children}
    </div>
  );
};

// ============================================
// FORM LABEL
// ============================================

export const Label = ({ 
  children, 
  htmlFor, 
  required = false, 
  className = '', 
  ...props 
}) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`form-label ${className}`}
      {...props}
    >
      {children}
      {required && <span className="form-required">*</span>}
    </label>
  );
};

// ============================================
// TEXT INPUT
// ============================================

export const Input = ({ 
  type = 'text',
  label,
  error,
  success,
  helper,
  required = false,
  leftIcon,
  rightIcon,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <div className={`input-wrapper ${error ? 'error' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}>
        {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
        <input
          id={inputId}
          type={type}
          className={`form-input ${leftIcon ? 'has-left-icon' : ''} ${rightIcon ? 'has-right-icon' : ''} ${className}`}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          {...props}
        />
        {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
      </div>
      {error && <span id={`${inputId}-error`} className="form-error">{error}</span>}
      {success && <span className="form-success">{success}</span>}
      {helper && !error && !success && <span id={`${inputId}-helper`} className="form-helper">{helper}</span>}
    </FormGroup>
  );
};

// ============================================
// PASSWORD INPUT
// ============================================

export const PasswordInput = ({ 
  label = 'Password',
  showStrength = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  
  const calculateStrength = (password) => {
    let score = 0;
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  };

  const handleChange = (e) => {
    if (showStrength) {
      calculateStrength(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength - 1] || 'Very Weak';
  const strengthClass = ['very-weak', 'weak', 'fair', 'good', 'strong'][strength - 1] || 'very-weak';

  return (
    <div className="password-input-container">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        label={label}
        onChange={handleChange}
        rightIcon={
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
      {showStrength && props.value && (
        <div className="password-strength">
          <div className="strength-bars">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`strength-bar ${i < strength ? strengthClass : ''}`}
              />
            ))}
          </div>
          <span className={`strength-label ${strengthClass}`}>{strengthLabel}</span>
        </div>
      )}
    </div>
  );
};

// ============================================
// TEXTAREA
// ============================================

export const Textarea = ({ 
  label,
  error,
  success,
  helper,
  required = false,
  maxLength,
  showCount = false,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  value = '',
  ...props 
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const [charCount, setCharCount] = useState(value.length);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label htmlFor={textareaId} required={required}>
          {label}
        </Label>
      )}
      <div className={`textarea-wrapper ${error ? 'error' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}>
        <textarea
          id={textareaId}
          className={`form-textarea ${className}`}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helper ? `${textareaId}-helper` : undefined}
          {...props}
        />
      </div>
      <div className="form-textarea-footer">
        <div>
          {error && <span id={`${textareaId}-error`} className="form-error">{error}</span>}
          {success && <span className="form-success">{success}</span>}
          {helper && !error && !success && <span id={`${textareaId}-helper`} className="form-helper">{helper}</span>}
        </div>
        {showCount && maxLength && (
          <span className="char-count">{charCount}/{maxLength}</span>
        )}
      </div>
    </FormGroup>
  );
};

// ============================================
// SELECT DROPDOWN
// ============================================

export const Select = ({ 
  label,
  options = [],
  placeholder = 'Select an option',
  error,
  success,
  helper,
  required = false,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label htmlFor={selectId} required={required}>
          {label}
        </Label>
      )}
      <div className={`select-wrapper ${error ? 'error' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}>
        <select
          id={selectId}
          className={`form-select ${className}`}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : helper ? `${selectId}-helper` : undefined}
          {...props}
        >
          <option value="" disabled selected hidden>{placeholder}</option>
          {options.map((option, index) => (
            <option 
              key={option.value || index} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="select-icon">
          <ChevronDownIcon />
        </span>
      </div>
      {error && <span id={`${selectId}-error`} className="form-error">{error}</span>}
      {success && <span className="form-success">{success}</span>}
      {helper && !error && !success && <span id={`${selectId}-helper`} className="form-helper">{helper}</span>}
    </FormGroup>
  );
};

// ============================================
// CHECKBOX
// ============================================

export const Checkbox = ({ 
  label,
  error,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`checkbox-wrapper ${containerClassName} ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        id={checkboxId}
        className={`form-checkbox ${className}`}
        disabled={disabled}
        {...props}
      />
      <label htmlFor={checkboxId} className="checkbox-label">
        <span className="checkbox-box">
          <CheckIcon />
        </span>
        {label && <span className="checkbox-text">{label}</span>}
      </label>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

// ============================================
// RADIO BUTTON
// ============================================

export const Radio = ({ 
  label,
  name,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`radio-wrapper ${containerClassName} ${disabled ? 'disabled' : ''}`}>
      <input
        type="radio"
        id={radioId}
        name={name}
        className={`form-radio ${className}`}
        disabled={disabled}
        {...props}
      />
      <label htmlFor={radioId} className="radio-label">
        <span className="radio-circle">
          <span className="radio-dot"></span>
        </span>
        {label && <span className="radio-text">{label}</span>}
      </label>
    </div>
  );
};

// ============================================
// RADIO GROUP
// ============================================

export const RadioGroup = ({ 
  label,
  name,
  options = [],
  error,
  helper,
  required = false,
  className = '',
  containerClassName = '',
  orientation = 'vertical', // 'vertical' or 'horizontal'
  ...props 
}) => {
  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      <div className={`radio-group ${orientation} ${className}`}>
        {options.map((option, index) => (
          <Radio
            key={option.value || index}
            name={name}
            label={option.label}
            value={option.value}
            disabled={option.disabled}
            {...props}
          />
        ))}
      </div>
      {error && <span className="form-error">{error}</span>}
      {helper && !error && <span className="form-helper">{helper}</span>}
    </FormGroup>
  );
};

// ============================================
// TOGGLE SWITCH
// ============================================

export const Toggle = ({ 
  label,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  size = 'medium', // 'small', 'medium', 'large'
  ...props 
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`toggle-wrapper ${containerClassName} ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        id={toggleId}
        className={`form-toggle ${className}`}
        disabled={disabled}
        {...props}
      />
      <label htmlFor={toggleId} className={`toggle-label ${size}`}>
        <span className="toggle-switch">
          <span className="toggle-slider"></span>
        </span>
        {label && <span className="toggle-text">{label}</span>}
      </label>
    </div>
  );
};

// ============================================
// FILE UPLOAD
// ============================================

export const FileUpload = ({ 
  label,
  accept,
  multiple = false,
  maxSize, // in MB
  error,
  helper,
  required = false,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  onFileSelect,
  ...props 
}) => {
  const fileId = id || `file-${Math.random().toString(36).substr(2, 9)}`;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    if (onFileSelect) {
      onFileSelect(fileArray);
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    if (onFileSelect) {
      onFileSelect(newFiles);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label htmlFor={fileId} required={required}>
          {label}
        </Label>
      )}
      <div 
        className={`file-upload-wrapper ${dragActive ? 'drag-active' : ''} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={fileId}
          className="file-input-hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={fileId} className="file-upload-label">
          <UploadIcon />
          <span className="file-upload-text">
            Drag and drop files here or click to browse
          </span>
          <span className="file-upload-hint">
            {accept ? `Accepted: ${accept}` : 'All file types accepted'}
            {maxSize && ` • Max size: ${maxSize}MB`}
          </span>
        </label>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="file-list">
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-item">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
              <button
                type="button"
                className="file-remove"
                onClick={() => removeFile(index)}
                aria-label="Remove file"
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {error && <span className="form-error">{error}</span>}
      {helper && !error && <span className="form-helper">{helper}</span>}
    </FormGroup>
  );
};

// ============================================
// RANGE SLIDER
// ============================================

export const RangeSlider = ({ 
  label,
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  showValue = true,
  showScale = false,
  helper,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const rangeId = id || `range-${Math.random().toString(36).substr(2, 9)}`;
  const [currentValue, setCurrentValue] = useState(value);
  
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label htmlFor={rangeId}>
          {label}
        </Label>
      )}
      <div className={`range-wrapper ${disabled ? 'disabled' : ''}`}>
        <input
          type="range"
          id={rangeId}
          className={`form-range ${className}`}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          style={{
            background: `linear-gradient(to right, #F07730 0%, #F07730 ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%, rgba(255, 255, 255, 0.1) 100%)`
          }}
          {...props}
        />
        {showValue && (
          <div className="range-value" style={{ left: `${percentage}%` }}>
            {currentValue}
          </div>
        )}
        {showScale && (
          <div className="range-scale">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
      {helper && <span className="form-helper">{helper}</span>}
    </FormGroup>
  );
};

// ============================================
// DATE PICKER
// ============================================

export const DatePicker = ({ 
  label,
  error,
  success,
  helper,
  required = false,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const dateId = id || `date-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <FormGroup className={containerClassName}>
      {label && (
        <Label htmlFor={dateId} required={required}>
          {label}
        </Label>
      )}
      <div className={`input-wrapper ${error ? 'error' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}>
        <input
          type="date"
          id={dateId}
          className={`form-input form-date ${className}`}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${dateId}-error` : helper ? `${dateId}-helper` : undefined}
          {...props}
        />
        <span className="input-icon-right date-icon">
          <CalendarIcon />
        </span>
      </div>
      {error && <span id={`${dateId}-error`} className="form-error">{error}</span>}
      {success && <span className="form-success">{success}</span>}
      {helper && !error && !success && <span id={`${dateId}-helper`} className="form-helper">{helper}</span>}
    </FormGroup>
  );
};

// ============================================
// SEARCH INPUT
// ============================================

export const SearchInput = ({ 
  placeholder = 'Search...',
  onSearch,
  className = '',
  containerClassName = '',
  id,
  disabled = false,
  ...props 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const searchId = id || `search-${Math.random().toString(36).substr(2, 9)}`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`search-form ${containerClassName}`}>
      <div className={`search-wrapper ${disabled ? 'disabled' : ''}`}>
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          type="search"
          id={searchId}
          className={`form-search ${className}`}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={disabled}
          {...props}
        />
        {searchValue && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </form>
  );
};

// ============================================
// FORM BUTTONS
// ============================================

export const Button = ({ 
  children,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'success', 'ghost'
  size = 'medium', // 'small', 'medium', 'large'
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`form-btn btn-${variant} btn-${size} ${fullWidth ? 'full-width' : ''} ${loading ? 'loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {!loading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span className="btn-text">{children}</span>
      {!loading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

// Export all components
export default {
  Form,
  FormGroup,
  Label,
  Input,
  PasswordInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  FileUpload,
  RangeSlider,
  DatePicker,
  SearchInput,
  Button
};