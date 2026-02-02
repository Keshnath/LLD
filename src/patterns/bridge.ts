interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  setVolume(volume: number): void;
}

class TV implements Device {
  isEnabled() { return true; }
  enable() { console.log("TV ON"); }
  disable() { console.log("TV OFF"); }
  setVolume(v: number) { console.log("TV volume:", v); }
}

class Remote  {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }
    
    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }
}

class AdvancedRemote extends Remote {
  mute() {
    this.device.setVolume(0);
  }
}

let tv = new TV();
let remote = new Remote(tv);
remote.togglePower(); // TV OFF
remote.togglePower(); // TV ON

let advancedRemote = new AdvancedRemote(tv);
advancedRemote.mute(); // TV volume: 0