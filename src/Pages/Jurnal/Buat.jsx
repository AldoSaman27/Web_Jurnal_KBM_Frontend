import "../../Styles/Jurnal/Buat.css";

// Assets
import Loading from "../../Assets/loading_white.svg";

// React
import React, { useState } from "react";

// React Bootstrap
import { Button, Container, Form, InputGroup } from "react-bootstrap";

// Axios
import axios from "axios";

// React Router Dom
import { useNavigate } from "react-router-dom";

const BuatJurnal = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [hariTanggalValue, setHariTanggalValue] = useState("");
  const [jamPelajaranValue, setJamPelajaranValue] = useState("");
  const [kelasValue, setKelasValue] = useState("");
  const [uraianKegiatanValue, setUraianKegiatanValue] = useState("");
  const [siswaHadirValue, setSiswaHadirValue] = useState("");
  const [siswaTanpaKabarValue, setSiswaTanpaKabarValue] = useState("");
  const [siswaSakitValue, setSiswaSakitValue] = useState("");
  const [siswaIzinValue, setSiswaIzinValue] = useState("");
  const [fotoKegiatanFile, setFotoKegiatanFile] = useState(null);
  const [fotoKegiatanPreview, setFotoKegiatanPreview] = useState(null);

  const handleFotoKegiatanChange = (e) => {
    setFotoKegiatanFile(e.target.files[0]);

    const imageURL = URL.createObjectURL(e.target.files[0]);
    setFotoKegiatanPreview(imageURL);
    return 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      hariTanggalValue === "" ||
      hariTanggalValue.length === 0 ||
      hariTanggalValue === null ||
      hariTanggalValue === undefined
    ) {
      return alert("Hari / Tanggal is required!");
    } else if (
      jamPelajaranValue === "" ||
      jamPelajaranValue.length === 0 ||
      jamPelajaranValue === null ||
      jamPelajaranValue === undefined
    ) {
      return alert("Jam Pelajaran is required!");
    } else if (
      kelasValue === "" ||
      kelasValue.length === 0 ||
      kelasValue === null ||
      kelasValue === undefined
    ) {
      return alert("Kelas is required!");
    } else if (
      uraianKegiatanValue === "" ||
      uraianKegiatanValue.length === 0 ||
      uraianKegiatanValue === null ||
      uraianKegiatanValue === undefined
    ) {
      return alert("Uraian Kegiatan is required!");
    } else if (
      siswaHadirValue === "" ||
      siswaHadirValue.length === 0 ||
      siswaHadirValue === null ||
      siswaHadirValue === undefined
    ) {
      return alert("Siswa Hadir is required!");
    } else if (
      siswaTanpaKabarValue === "" ||
      siswaTanpaKabarValue.length === 0 ||
      siswaTanpaKabarValue === null ||
      siswaTanpaKabarValue === undefined
    ) {
      return alert("Siswa Tanpa Kabar is required!");
    } else if (
      siswaSakitValue === "" ||
      siswaSakitValue.length === 0 ||
      siswaSakitValue === null ||
      siswaSakitValue === undefined
    ) {
      return alert("Siswa Sakit is required!");
    } else if (
      siswaIzinValue === "" ||
      siswaIzinValue.length === 0 ||
      siswaIzinValue === null ||
      siswaIzinValue === undefined
    ) {
      return alert("Siswa Izin is required!");
    } else if (
      fotoKegiatanFile === "" ||
      fotoKegiatanFile === 0 ||
      fotoKegiatanFile === null ||
      fotoKegiatanFile === undefined
    ) {
      return alert("Foto Kegiatan is required!");
    } else if (!fotoKegiatanFile.type.includes("image")) {
      return alert("Foto Kegiatan: Only image files are allowed");
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("nip", localStorage.getItem("nip"));
    formData.append("hari_tanggal", hariTanggalValue);
    formData.append("jam_ke", jamPelajaranValue);
    formData.append("kelas", kelasValue);
    formData.append("uraian_kegiatan", uraianKegiatanValue);
    formData.append(
      "kehadiran",
      `${siswaHadirValue} Hadir, ${siswaTanpaKabarValue} Tanpa Kabar, ${siswaSakitValue} Sakit, ${siswaIzinValue} Izin`
    );
    formData.append("foto_kegiatan", fotoKegiatanFile);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    axios.defaults.headers.common["Accept"] = "application/json";
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/jurnal/store`, formData)
      .then((res) => {
        setIsLoading(false);

        alert("Jurnal has been created successfully.");

        return navigate("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);

        return alert(
          "Internal Server Error. Please contact the development team!"
        );
      });

    return 1;
  };

  return (
    <section id="buat-jurnal" className="buat-jurnal">
      <Container className="d-flex flex-column">
        <h3 className="text-primary">Buat Jurnal</h3>
        <form method="POST" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Hari / Tanggal</Form.Label>
            <Form.Control
              type="date"
              placeholder="Hari / Tanggal"
              onChange={(e) => setHariTanggalValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Jam Pembelajaran</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jam Pembelajaran"
              onChange={(e) => setJamPelajaranValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Kelas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kelas"
              onChange={(e) => setKelasValue(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
            <Form.Label>Uraian Kegiatan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Uraian Kegiatan"
              onChange={(e) => setUraianKegiatanValue(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Kehadiran</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              aria-label="Hadir"
              placeholder="Hadir"
              onChange={(e) => setSiswaHadirValue(e.target.value)}
            />
            <Form.Control
              type="number"
              aria-label="Tanpa Kabar"
              placeholder="Tanpa Kabar"
              onChange={(e) => setSiswaTanpaKabarValue(e.target.value)}
            />
            <Form.Control
              type="number"
              aria-label="Sakit"
              placeholder="Sakit"
              onChange={(e) => setSiswaSakitValue(e.target.value)}
            />
            <Form.Control
              type="number"
              aria-label="Izin"
              placeholder="Izin"
              onChange={(e) => setSiswaIzinValue(e.target.value)}
            />
          </InputGroup>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Foto Kegiatan</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFotoKegiatanChange}
            />
          </Form.Group>

          <img src={fotoKegiatanPreview} alt="" className="foto-kegiatan" />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <img src={Loading} alt="" width={20} /> : null}
            Submit
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default BuatJurnal;
