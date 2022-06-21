import { Component, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

// type
import { RxJalanDocument, RxJalanDocumentType } from '../../schemas/jalan.schema';

// data jalan
import { dataJalan } from '../../../assets/excel/data_jalan';

@Component({
	selector: 'app-jalan',
	templateUrl: './jalan.component.html',
	styleUrls: ['./jalan.component.scss'],
	providers: [DatabaseService],
	changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class JalanComponent {
	jalanColl = this.databaseServ.db.jalan;
	testData;

	data = dataJalan;
	p = {
		"FID": null,
		"ID": null,
		"NAMA_RUAS": null,
		"KECAMATAN_": null,
		"PANJANG_KM": null,
		"LEBAR_M": null,
		"LAPEN_KM": null,
		"BETON_KM": null,
		"TELFORD_KE": null,
		"TANAH_KM": null,
		"BELUMTEMBU": null,
		"BAIK_KM": null,
		"BAIK__PERS": null,
		"SEDANG_KM": null,
		"SEDANG_PER": null,
		"RUSAKRINGA": null,
		"RUSAKRIN00": null,
		"RUSAKBERAT": null,
		"RUSAKBER00": null,
		"LHR": null,
		"AKSES_KE_N": null,
		"KETERANGAN": null,
		// "FOTO": null,
		// "FOTO_1": null,
		// "FOTO_12": null,
		// "FOTO_12_13": null,
		// "FOTO_ASPAL": null,
		// "FOTO_BETON": null,
		// "FOTO_TELFO": null,
		// "FOTO_TANAH": null,
		"STA_AWAL": null,
		"STA_AKHIR": null,
	}

	constructor(private databaseServ: DatabaseService) {}

	ngAfterViewInit(){
		let data = {
			idJalan: "IdJalan" + Date.now(),
			nama_jalan: 'Test Nama Jalan',
			koordinat: [
			[130.995195324319, -2.5659269488061],
			[133.457940099782, -0.915689659260994]
			]
		}
		console.clear();
		this.tambahJalan(data);
		console.log(this.data[0]);
	}

	tambahJalan(data){
		this.jalanColl.findOne({ idJalan : {$eq: data.idJalan} }).exec()
		.then((has: RxJalanDocument | null) => {
			// console.log(has);
			if (has == null) {
				this.databaseServ.db.jalan.insert(data).then(data => {
					console.log("simpan done", data.idJalan);
				}).catch(err => {
					console.log("simpan err", err)
				})
			}
			this.cariSemuaJalan();	
		});
	}

	cariSemuaJalan(){
		this.jalanColl.find().exec().then(data => {
			data.forEach(v => {
				// console.log(v.get("idJalan"), v.get("nama_jalan"), v.get("koordinat"));
			})
		});
	}

	isDetail = false;
	detail(i){
		this.isDetail = true;
		this.p.FID = this.data[i].FID ,
		this.p.ID = this.data[i].ID ,
		this.p.NAMA_RUAS = this.data[i].NAMA_RUAS ,
		this.p.KECAMATAN_ = this.data[i].KECAMATAN_ ,
		this.p.PANJANG_KM = this.data[i].PANJANG_KM ,
		this.p.LEBAR_M = this.data[i].LEBAR_M ,
		this.p.LAPEN_KM = this.data[i].LAPEN_KM ,
		this.p.BETON_KM = this.data[i].BETON_KM ,
		this.p.TELFORD_KE = this.data[i].TELFORD_KE ,
		this.p.TANAH_KM = this.data[i].TANAH_KM ,
		this.p.BELUMTEMBU = this.data[i].BELUMTEMBU ,
		this.p.BAIK_KM = this.data[i].BAIK_KM ,
		this.p.BAIK__PERS = this.data[i].BAIK__PERS ,
		this.p.SEDANG_KM = this.data[i].SEDANG_KM ,
		this.p.SEDANG_PER = this.data[i].SEDANG_PER ,
		this.p.RUSAKRINGA = this.data[i].RUSAKRINGA ,
		this.p.RUSAKRIN00 = this.data[i].RUSAKRIN00 ,
		this.p.RUSAKBERAT = this.data[i].RUSAKBERAT ,
		this.p.RUSAKBER00 = this.data[i].RUSAKBER00 ,
		this.p.LHR = this.data[i].LHR ,
		this.p.AKSES_KE_N = this.data[i].AKSES_KE_N ,
		this.p.KETERANGAN = this.data[i].KETERANGAN ,
		// this.p.FOTO = this.data[i].FOTO ,
		// this.p.FOTO_1 = this.data[i].FOTO_1 ,
		// this.p.FOTO_12 = this.data[i].FOTO_12 ,
		// this.p.FOTO_12_13 = this.data[i].FOTO_12_13 ,
		// this.p.FOTO_ASPAL = this.data[i].FOTO_ASPAL ,
		// this.p.FOTO_BETON = this.data[i].FOTO_BETON ,
		// this.p.FOTO_TELFO = this.data[i].FOTO_TELFO ,
		// this.p.FOTO_TANAH = this.data[i].FOTO_TANAH ,
		this.p.STA_AWAL = this.data[i].STA_AWAL ,
		this.p.STA_AKHIR = this.data[i].STA_AKHIR ,

		console.log(this.data[i], this.p)
	}
}
