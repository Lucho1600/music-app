import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {

  searching = false;
  text = "Ingrese una palabra";
  songs: any;
  song: any;
  currentSong: HTMLAudioElement;

  constructor(private modalController: ModalController, private musicService: MusicService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  getTracks(keyword) {
    this.searching = true;
    if (keyword.length > 0 ) {
      this.musicService.searchTracks(keyword).subscribe( async resp => {
        this.songs = resp;
        console.log(this.songs)
        if ( this.songs.length === 0){
          this.text = "No se encontro ninguna cancion"
        }
        this.searching = false;
      });
    }else{
      this.text = "ingrese una palabra para buscar";
      this.songs = [];
    }
  }

  play( song ) {
    if (this.currentSong) {
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('ended', () => this.song.playing = false);
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

}