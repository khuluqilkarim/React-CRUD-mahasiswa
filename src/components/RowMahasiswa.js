import React, { useState } from "react";

const RowMahasiswa = (props) => {
  const initialData = {
    nim: props.mahasiswa.nim,
    nama: props.mahasiswa.nama,
    jurusan: props.mahasiswa.jurusan,
    asalProvinsi: props.mahasiswa.asalProvinsi,
  };

  const [formInput, setFormInput] = useState(initialData);
  const [errors, setErrors] = useState({
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [resetData, setResetData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleEditClick = () => {
    setResetData({ ...formInput });
    setEditMode(true);
  };

  const handleFormReset = (e) => {
    e.preventDefault();
    setFormInput({ ...resetData });
    setErrors({});
    setEditMode(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    // Validasi nama
    if (formInput.nama.trim() === "") {
      newErrors.nama = "Nama tidak boleh kosong";
    }

    // Validasi jurusan
    if (formInput.jurusan.trim() === "") {
      newErrors.jurusan = "Jurusan tidak boleh kosong";
    }

    // Validasi asalProvinsi
    if (formInput.asalProvinsi.trim() === "") {
      newErrors.asalProvinsi = "Asal Provinsi tidak boleh kosong";
    }

    setErrors(newErrors);

    const formValid = Object.values(newErrors).every((error) => error === "");

    if (formValid) {
      props.onEditMahasiswa(formInput);
      setEditMode(false);
    }
  };

  return (
    <React.Fragment>
      {editMode ? (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
              <div className="row row-cols-5 g-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    defaultValue={formInput.nim}
                    name="nim"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="nama"
                    onChange={handleInputChange}
                    value={formInput.nama}
                  />
                  {errors.nama && <small>{errors.nama}</small>}
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="jurusan"
                    onChange={handleInputChange}
                    value={formInput.jurusan}
                  />
                  {errors.jurusan && <small>{errors.jurusan}</small>}
                </div>

                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="asalProvinsi"
                    onChange={handleInputChange}
                    value={formInput.asalProvinsi}
                  />
                  {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
                </div>
                <div className="col">
                  <button className="btn btn-success me-2" type="submit">
                    Simpan
                  </button>
                  <button className="btn btn-warning" type="reset">
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{formInput.nim}</td>
          <td>{formInput.nama}</td>
          <td>{formInput.jurusan}</td>
          <td>{formInput.asalProvinsi}</td>
          <td>
            <button
              className="btn btn-secondary me-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              id={formInput.nim}
              onClick={props.onHapusMahasiswa}
            >
              Hapus
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default RowMahasiswa;
