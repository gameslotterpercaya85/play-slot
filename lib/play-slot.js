'use babel';

import PlaySlotView from './play-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  playSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.playSlotView = new PlaySlotView(state.playSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.playSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'play-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.playSlotView.destroy();
  },

  serialize() {
    return {
      playSlotViewState: this.playSlotView.serialize()
    };
  },

  toggle() {
    console.log('PlaySlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
