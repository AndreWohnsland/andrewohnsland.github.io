import React, { useState } from 'react';
import TextInput from './Forms/TextInput';
import { Form, Button } from 'react-bootstrap';
import Dropdown from './Forms/Dropdown';

const resourceTypes = 'image/*,video/*';

type BlogResourcesProps = {
  blogId: string;
};

const BlogRessources: React.FC<BlogResourcesProps> = ({ blogId }) => {
  const [name, setName] = useState('');
  const [resource, setRessource] = useState<File | null>(null);
  const [selectedResource, setSelectedResource] = useState('');

  const validateSubmit = () => {
    return name.length > 0 && resource !== null;
  };

  const clearState = () => {
    setName('');
    setRessource(null);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    data.append('file', resource as any);
    data.append('name', name);
    data.append('blogId', blogId);
    clearState();
  };

  return (
    <div className="user-form-container">
      <div>
        <h3>Manage Blog Resources</h3>
        <Dropdown
          label="Resource to insert"
          value={selectedResource}
          options={[
            { name: '1', value: '1' },
            { name: '2', value: '2' },
          ]}
          onChange={(e) => setSelectedResource(e.target.value)}
        />
        <Button>Copy to Clipboard</Button>
        <Button variant="danger" className="align-right">
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
                setRessource(e.target.files === null ? null : e.target.files[0])
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
