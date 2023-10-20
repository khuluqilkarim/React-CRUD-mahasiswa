import React, { useState } from "react";

const RowTambahMahasiswa = (props) => {
  const [formInput, setFormInput] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  const [errors, setErrors] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  const handleInputChange = (event) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  const cekDuplikasiNim = () => {
    return props.mahasiswas.find(
      (mahasiswa) => mahasiswa.nim === formInput.nim
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let pesanErrors = {};

    // Validasi nim
    if (formInput.nim.trim() === "") {
      pesanErrors.nim = "Nim tidak boleh kosong";
    } else if (!/^[0-9]{8}$/.test(formInput.nim)) {
      pesanErrors.nim = "Nim harus 8 karakter angka";
    } else if (cekDuplikasiNim()) {
      pesanErrors.nim = "Nim sudah dipakai";
    } else {
      pesanErrors.nim = "";
    }

    // Validasi nama
    if (formInput.nama.trim() === "") {
      pesanErrors.nama = "Nama tidak boleh kosong";
    } else {
      pesanErrors.nama = "";
    }

    // Validasi jurusan
    if (formInput.jurusan.trim() === "") {
      pesanErrors.jurusan = "Jurusan tidak boleh kosong";
    } else {
      pesanErrors.jurusan = "";
    }

    // Validasi asalProvinsi
    if (formInput.asalProvinsi.trim() === "") {
      pesanErrors.asalProvinsi = "Asal Provinsi tidak boleh kosong";
    } else {
      pesanErrors.asalProvinsi = "";
    }

    setErrors(pesanErrors);

    let formValid = true;

    for (let inputName in pesanErrors) {
      if (pesanErrors[inputName].length > 0) {
        formValid = false;
        break;
      }
    }

    if (formValid) {
      props.onTambahMahasiswa(formInput);
      setFormInput({
        nim: "",
        nama: "",
        jurusan: "",
        asalProvinsi: "",
      });
    }
  };

  return (
    <tr>
      <td colSpan="5">
        <form onSubmit={handleFormSubmit}>
          <div className="row row-cols-5 g-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nim"
                placeholder="00000000"
                onChange={handleInputChange}
                value={formInput.nim}
              />
              {errors.nim && <small>{errors.nim}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Fulan Fulana"
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
                placeholder="Sistem Informasi"
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
                placeholder="DKI Jakarta"
                onChange={handleInputChange}
                value={formInput.asalProvinsi}
              />
              {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default RowTambahMahasiswa;
