import React, { useState, useCallback, useEffect } from 'react';
import TextInput from './Forms/TextInput';
import { Form, Button } from 'react-bootstrap';
import Dropdown from './Forms/Dropdown';
import confirmAlert from './Forms/ConfirmAlert';
import { IResource } from '../../Interfaces/resource.interface';
import {
  getResources,
  deleteResource,
  postResource,
} from '../../util/apiHelper';

const resourceTypes = 'image/*,video/*';

type BlogResourcesProps = {
  blogId: string;
};

type OptionsProps = {
  name: string;
  value: string;
};

const BlogRessources: React.FC<BlogResourcesProps> = ({ blogId }) => {
  const [name, setName] = useState('');
  const [upload, setUpload] = useState<File | null | undefined>(null);
  const [selectedResource, setSelectedResource] = useState('');
  const [resources, setResources] = useState<IResource[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);

  const loadResources = useCallback(async () => {
    setSelectedResource('');
    const resourceData = await getResources();
    setResources(resourceData);
    if (resourceData) {
      setOptions([
        { name: 'Select Resource', value: '' },
        ...resourceData
          .filter((element) => element.blogId === blogId)
          .map((element) => ({
            name: `${element.name} (${element.filename})`,
            value: element._id,
          })),
      ]);
    }
  }, [blogId]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  const validateSubmit = () => {
    return name.length > 0 && upload !== null;
  };

  const clearState = () => {
    setName('');
    setUpload(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    data.append('file', upload as any);
    data.append('name', name);
    data.append('blogId', blogId);
    postResource(data)
      .then(() => {
        clearState();
        loadResources();
      })
      .catch((err) => alert(err.response.data.message));
  };

  const handelDelete = async () => {
    deleteResource(selectedResource).then((response) => {
      if (response.statusText === 'OK') {
        setSelectedResource('');
        loadResources();
      }
    });
  };

  const runDelete = () => {
    const prompt = 'Do you want to delete the resource?';
    confirmAlert(prompt, handelDelete);
  };

  const copyToClipboard = () => {
    if (selectedResource === '') return;
    const currentResource = resources.filter(
      (r) => r._id === selectedResource
    )[0];
    const text = `![${currentResource.name}](${currentResource.link})`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="user-form-container">
      <div>
        <h3 className="user-form-header">Manage Blog Resources</h3>
        <Dropdown
          label="Resource to insert"
          value={selectedResource}
          options={options}
          onChange={(e) => setSelectedResource(e.target.value)}
        />
        <Button onClick={copyToClipboard} disabled={selectedResource === ''}>
          Copy to Clipboard
        </Button>
        <Button
          variant="danger"
          className="align-right"
          onClick={runDelete}
          disabled={selectedResource === ''}
        >
          Delete
        </Button>
      </div>
      <br />
      <div>
        <h4>Upload new</h4>
        <form onSubmit={onSubmit}>
          <TextInput
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Group className="element-form-group">
            <Form.Label>Resource</Form.Label>
            <Form.Control
              type="file"
              name="uploadImage"
              required
              accept={`${resourceTypes}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpload(e.target.files === null ? null : e.target.files[0])
              }
            />
          </Form.Group>
          <Button type="submit" disabled={!validateSubmit()}>
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BlogRessources;
