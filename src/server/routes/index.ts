import { IRouter } from '../../../../src/core/server';
import { schema } from '@osd/config-schema';
const { Client } = require("@opensearch-project/opensearch");
import { PluginStart as DataPluginStart, IOpenSearchSearchRequest } from '../../../../src/plugins/data/server';
import { IOpenSearchSearchResponse } from '../../../../src/plugins/data/common';
const fs = require('fs');

var host = "os1";
var protocol = "https";
var port = 9200;
var auth = "admin:admin";
var ca_certs_path = "/home/node/kbn/plugins/custom_plugin/server/root-ca-key.pem";

var client = new Client({
  node: protocol + "://" + auth + "@" + host + ":" + port,
  ssl: {
    ca: fs.readFileSync(ca_certs_path),
    rejectUnauthorized: false
  }
});

export function defineRoutes(router: IRouter, data: DataPluginStart) {

  // example endpoint
  router.get(
    {
      path: '/api/custom_plugin/example',
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString() + 'hola',
        },
      });
    }
  );


  // Test Client // WIP
  router.get(
    {
      path: '/api/custom_plugin/client',
      validate: false
    },
    async (context, request, response) => {
      console.log('client endpoint')

      const query = {
        query: {
          match: {
            description: {
              query: "something"
            }
          }
        }
      }
      const res = await client.search({
        index: 'sample-index',
        body: query
      })
      
      console.log(res)
      return response.ok({
        body: res
      });
    }
  )

  // Get Tasks
  router.get(
    {
      path: '/api/custom_plugin/get-todos',
      validate: false
    },
    async (context, request, response) => {

      // query for all documents in todos index
      const query = {
        query: {
          match_all: {}
        }
      }
      
      const res = await client.search({
        index: 'todos',
        size: 1000,
        body: query
      })

      const {hits} = res.body.hits 

      // map hits and return _source, add id to _source
      const todos = hits.map((hit: any) => {
        const {_source, _id} = hit
        return {
          ..._source,
          id: _id
        }
      })
      
      return response.ok({
        body: todos 
      });
    }
  )

  // Create a todo - Working
  router.get(
    {
      path: '/api/custom_plugin/create-task/{data}',
      validate: {
        params: schema.object({
          data: schema.string(),
        }),
      }
    },
    async (context, request, response) => {

      const {data} = request.params
      const content = JSON.parse(data)
      const {text, priority, finishDate } = content

      var document = {
        text,
        tags: ["bug", "breaking"],
        priority,
        completed: false,
        finish_date: finishDate,
        created_at: new Date().toISOString()
      };
    
      var res = await client.index({
        index: 'todos',
        body: document,
        refresh: true,
      });

      return response.ok({
        body: res
      });
    }
  )
  // UPDATE complete field in task
  router.put(
    {
      path: '/api/custom_plugin/update-todo/{p}',
      validate: {
        params: schema.object({
          p: schema.string(),
        }),
      }
    },
    async (context, request, response) => {
      
      const {p} = request.params

      const params = JSON.parse(p)

      let completed_at = null
      if(!params.completed === true) {
        completed_at = new Date().toISOString()
      }

      var document = {
        completed: !params.completed,
        completed_at
      };

      var res = await client.update({
        index: 'todos',
        id: params.id,
        body: {
          doc: document
        }
      });
      
      return response.ok({
        body: res
      });
    }
  )
  // UPDATE task
  router.put(
    {
      path: '/api/custom_plugin/edit-todo/{data}',
      validate: {
        params: schema.object({
          data: schema.string(),
        }),
      }
    },
    async (context, request, response) => {
      
      const {data} = request.params

      const params = JSON.parse(data)

      var document = {
        text: params.text,
        priority: params.priority,
        finish_date: params.finishDate,
        tags: params.tags
      };

      var res = await client.update({
        index: 'todos',
        id: params.id,
        body: {
          doc: document
        }
      });
      
      return response.ok({
        body: res
      });
    }
  )
  // DELETE task
  router.delete(
    {
      path: '/api/custom_plugin/delete-todo/{id}',
      validate: {
        params: schema.object({
          id: schema.string(),
        }),
      }
    },
    async (context, request, response) => {
      const { id } = request.params

      var res = await client.delete({
        index: 'todos',
        id,
      });
      
      return response.ok({
        body: res
      });
    }
  )

  
  // Search by Field Data plugin - WIP
  router.get(
    {
      path: '/api/custom_plugin/search_by_field',
      validate: false
    },

    async (context, request, response) => {
      const index = 'sample-index'
      const params: RequestParams.Search = {
        index,
      };

      const res = await data.search.search(
        context,
        {
          params: {
            index,
            body: {
              aggs: {
                '1': {
                  avg: {
                    field: 'description',
                  },
                },
              },
            },
          },
        } as IOpenSearchSearchRequest,
        {}
      );
      
      return response.ok({
        body: {
          res
        },
      });
    }
  );
}
