import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import log from '../lib/log';
import localforage from 'localforage';
import CustomExtensionModalComponent from '../components/tw-custom-extension-modal/custom-extension-modal.jsx';
import { closeCustomExtensionModal } from '../reducers/modals';
import { manuallyTrustExtension, isTrustedExtension } from './tw-security-manager.jsx';

const generateRandomId = () => {
    const randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return randomChars.split('')
        .map(() => (randomChars.at(Math.round(Math.random() * (randomChars.length - 1)))))
        .join('')
        .substring(0, 20);
};

class CustomExtensionModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleChangeFile',
            'handleChangeURL',
            'handleClose',
            'handleKeyDown',
            'handleLoadExtension',
            'handleSwitchToFile',
            'handleSwitchToURL',
            'handleSwitchToText',
            'handleChangeText',
            'handleDragOver',
            'handleDragLeave',
            'handleDrop',
            'handleChangeUnsandboxed',
            'handleChangeAddToLibrary',
            'handleChangeLibraryItem',
            'handleLoadingDataUrl'
        ]);
        this.state = {
            files: null,
            type: 'url',
            url: '',
            file: null,
            text: '',
            unsandboxed: false,
            addingToLibrary: false,
            libraryImageFile: null,
            libraryItem: {
                name: 'Extension',
                description: 'Adds new blocks.',
                tags: ['myextensions'],
                rawURL: 'https://penguinmod.com/line_blue.png',
                featured: true,
                deletable: true,
                _id: generateRandomId()
            }
        };
    }
    getExtensionURL() {
        if (this.state.type === 'url') {
            return this.state.url;
        }
        if (this.state.type === 'file') {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error(`Could not read extension as data URL: ${reader.error}`));
                reader.readAsDataURL(this.state.file);
            });
        }
        if (this.state.type === 'text') {
            return `data:application/javascript,${encodeURIComponent(this.state.text)}`;
        }
        return Promise.reject(new Error('Unknown type'));
    }
    hasValidInput() {
        if (this.state.type === 'url') {
            try {
                const parsed = new URL(this.state.url);
                return (
                    parsed.protocol === 'https:' ||
                    parsed.protocol === 'http:' ||
                    parsed.protocol === 'data:'
                );
            } catch (e) {
                return false;
            }
        }
        if (this.state.type === 'file') {
            return !!this.state.file;
        }
        if (this.state.type === 'text') {
            return !!this.state.text;
        }
        return false;
    }
    handleChangeFile(file) {
        this.setState({
            file
        });
    }
    handleChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }
    handleClose() {
        this.props.onClose();
    }
    handleKeyDown(e) {
        if (e.key === 'Enter' && this.hasValidInput()) {
            e.preventDefault();
            this.handleLoadExtension();
        }
    }
    async handleLoadExtension() {
        let failed = false;
        this.handleClose();
        try {
            const url = await this.getExtensionURL();
            if (this.state.type !== 'url' && this.state.unsandboxed) {
                manuallyTrustExtension(url);
            }
            await this.props.vm.extensionManager.loadExtensionURL(url);
        } catch (err) {
            failed = true;
            log.error(err);
            // eslint-disable-next-line no-alert
            alert(err);
        } finally {
            if (failed) return;
            if (!this.state.addingToLibrary) return;
            // we are only adding to library if it succeeded to load
            const id = "pm:favorited_extensions";
            const libraryItem = this.state.libraryItem;
            const url = await this.getExtensionURL();
            const favorites = await localforage.getItem(id);
            libraryItem.extensionId = url;
            libraryItem._unsandboxed = this.state.unsandboxed;
            // console.log(libraryItem);
            if (!favorites) {
                await localforage.setItem(id, [libraryItem]);
                return;
            }
            favorites.push(libraryItem);
            await localforage.setItem(id, favorites);
            return;
        }
    }
    handleSwitchToFile() {
        this.setState({
            type: 'file'
        });
    }
    handleSwitchToURL() {
        this.setState({
            type: 'url'
        });
    }
    handleSwitchToText() {
        this.setState({
            type: 'text'
        });
    }
    handleChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }
    handleDragOver(e) {
        if (e.dataTransfer.types.includes('Files')) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }
    }
    handleDragLeave() {

    }
    handleDrop(e) {
        const file = e.dataTransfer.files[0];
        if (file) {
            e.preventDefault();
            this.setState({
                type: 'file',
                file
            });
        }
    }
    isUnsandboxed() {
        if (this.state.type === 'url') {
            return isTrustedExtension(this.state.url);
        }
        return this.state.unsandboxed;
    }
    canChangeUnsandboxed() {
        return this.state.type !== 'url';
    }
    handleChangeUnsandboxed(e) {
        this.setState({
            unsandboxed: e.target.checked
        });
    }
    handleChangeAddToLibrary(e) {
        this.setState({
            addingToLibrary: e.target.checked
        });
    }
    async handleLoadingDataUrl(file) {
        const fr = new FileReader();
        fr.onerror = () => {
            return alert("Failed to load the image!");
        }
        fr.onload = () => {
            if (!file.type.startsWith('image/')) {
                return alert("This is not an image!");
            }
            const url = fr.result;
            const libraryItem = this.state.libraryItem;
            const newData = {
                rawURL: url
            };
            this.setState({
                libraryItem: {
                    ...libraryItem,
                    ...newData
                },
                libraryImageFile: file
            });
        };
        fr.readAsDataURL(file);
    }
    handleChangeLibraryItem(key, e) {
        const newData = {};
        if (key === "rawURL") {
            this.handleLoadingDataUrl(e);
            return;
        }
        let value = e.target.value;
        newData[key] = value;
        const libraryItem = this.state.libraryItem;
        this.setState({
            libraryItem: {
                ...libraryItem,
                ...newData
            }
        });
    }
    render() {
        return (
            <CustomExtensionModalComponent
                canLoadExtension={this.hasValidInput()}
                type={this.state.type}
                onSwitchToFile={this.handleSwitchToFile}
                onSwitchToURL={this.handleSwitchToURL}
                onSwitchToText={this.handleSwitchToText}
                file={this.state.file}
                onChangeFile={this.handleChangeFile}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                url={this.state.url}
                onChangeURL={this.handleChangeURL}
                onKeyDown={this.handleKeyDown}
                text={this.state.text}
                onChangeText={this.handleChangeText}
                unsandboxed={this.isUnsandboxed()}
                onChangeUnsandboxed={this.canChangeUnsandboxed() ? this.handleChangeUnsandboxed : null}
                addToLibrary={this.state.addingToLibrary}
                onChangeAddToLibrary={this.handleChangeAddToLibrary}
                onLoadExtension={this.handleLoadExtension}
                onClose={this.handleClose}

                libraryItemName={this.state.libraryItem.name}
                libraryItemDescription={this.state.libraryItem.description}
                libraryItemImage={this.state.libraryItem.rawURL}
                libraryItemFile={this.state.libraryImageFile}

                onChangeLibraryItem={this.handleChangeLibraryItem}
            />
        );
    }
}

CustomExtensionModal.propTypes = {
    onClose: PropTypes.func,
    vm: PropTypes.shape({
        extensionManager: PropTypes.shape({
            loadExtensionURL: PropTypes.func
        })
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeCustomExtensionModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomExtensionModal);
