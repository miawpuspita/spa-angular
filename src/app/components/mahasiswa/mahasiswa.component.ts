import { Component, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})
export class MahasiswaComponent implements OnInit {
  mahasiswa: any[] = [];
  prodi: any[] = [];
  jenisKelamin: string[] = ['L', 'P'];
  apiMahasiswaUrl = 'https://crud-express-seven.vercel.app/api/mahasiswa';
  apiProdiUrl = 'https://crud-express-seven.vercel.app/api/prodi';
  isLoading = true;
  mahasiswaForm: FormGroup;
  isSubmitting = false;
  editMahasiswaId: string | null = null;

  @Output() mahasiswaAdded = new EventEmitter<void>(); // EventEmitter untuk memberi tahu komponen induk

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.mahasiswaForm = this.fb.group({
      npm: [''],
      nama: [''],
      jenis_kelamin: [''],
      asal_sekolah: [''],
      prodi_id: [null]
    });
  }

  ngOnInit(): void {
    this.getMahasiswa();
    this.getProdi();
  }

  getMahasiswa(): void {
    this.http.get<any[]>(this.apiMahasiswaUrl).subscribe({
      next: (data) => {
        this.mahasiswa = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching mahasiswa data:', err);
        this.isLoading = false;
      },
    });
  }

  getProdi(): void {
    this.http.get<any[]>(this.apiProdiUrl).subscribe({
      next: (data) => {
        this.prodi = data;
      },
      error: (err) => {
        console.error('Error fetching prodi data:', err);
      },
    });
  }

  addMahasiswa(): void {
    if (this.mahasiswaForm.valid) { 
      this.isSubmitting = true;

    const token = localStorage.getItem('authToken'); // Ambil token dari local storage
    const headers = { Authorization: `Bearer ${token}` };

      this.http.post(this.apiMahasiswaUrl, this.mahasiswaForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Mahasiswa berhasil ditambahkan:', response);
          this.getMahasiswa();
          this.mahasiswaForm.reset();
          this.isSubmitting = false;
          const modalElement = document.getElementById('tambahMahasiswaModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();

            modalElement.addEventListener('hidden.bs.modal', () => { // Tambahkan event listener untuk modal yang ditutup.
              const backdrop = document.querySelector('.modal-backdrop'); // Cari elemen backdrop modal.
              if (backdrop) { 
                backdrop.remove(); // Hapus backdrop jika ada.
              }

              // Pulihkan scroll pada body
              document.body.classList.remove('modal-open'); // Hapus class 'modal-open' dari body.
              document.body.style.overflow = ''; // Pulihkan properti overflow pada body.
              document.body.style.paddingRight = ''; // Pulihkan padding body.
            }, { once: true }); // Event listener hanya dijalankan sekali.
          }
        },
        error: (err) => {
          console.error('Error menambahkan mahasiswa:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  deleteMahasiswa(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      
    // const token = localStorage.getItem('authToken'); // Ambil token dari local storage
    // const headers = { Authorization: `Bearer ${token}` };

      this.http.delete(`${this.apiMahasiswaUrl}/${_id}`).subscribe({
        next: () => {
          //console.log(`Mahasiswa dengan ID ${_id} berhasil dihapus`);
          this.getMahasiswa();
        },
        error: (err) => {
          console.error('Error menghapus mahasiswa:', err);
        }
      });
    }
  }

  getMahasiswaById(_id: string): void {
    this.editMahasiswaId = _id;
    this.http.get(`${this.apiMahasiswaUrl}/${_id}`).subscribe({
      next: (data: any) => {
        this.mahasiswaForm.patchValue({
          npm: data.npm,
          nama: data.nama,
          jenis_kelamin: data.jenis_kelamin,
          asal_sekolah: data.asal_sekolah,
          prodi_id: data.prodi_id,
        });
        const modalElement = document.getElementById('editMahasiswaModal') as HTMLElement;
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      },
      error: (err) => {
        console.error('Error fetching mahasiswa data by ID:', err);
      },
    });
  }

  updateMahasiswa(): void {
    if (this.mahasiswaForm.valid) {
      this.isSubmitting = true;

    const token = localStorage.getItem('authToken'); // Ambil token dari local storage
    const headers = { Authorization: `Bearer ${token}` };

      this.http.put(`${this.apiMahasiswaUrl}/${this.editMahasiswaId}`, this.mahasiswaForm.value, { headers }).subscribe({
        next: (response) => {
          console.log('Mahasiswa berhasil diperbarui:', response);
          this.getMahasiswa();
          this.isSubmitting = false;

          const modalElement = document.getElementById('editMahasiswaModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: (err) => {
          console.error('Error updating mahasiswa:', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
