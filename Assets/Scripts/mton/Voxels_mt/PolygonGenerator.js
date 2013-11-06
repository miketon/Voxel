#pragma strict

public var nVertices:Vector2[];
public var nTriangles:int[];

private var mesh:Mesh;
private var xform:Transform;

function Start () {
  xform = transform;
  mesh = GetComponent(MeshFilter).mesh;
  
  var x:float = xform.position.x;
  var y:float = xform.position.y;
  var z:float = xform.position.z;

  var arrVertices:Array = new Array();   //positive x is to the right and negative y is down
  arrVertices.Push( Vector3 (x  , y  , z ));
  arrVertices.Push( Vector3 (x + 1 , y  , z ));
  arrVertices.Push( Vector3 (x + 1 , y-1  , z ));
  arrVertices.Push( Vector3 (x  , y-1  , z ));
  
  var arrTriangles:Array = new Array();
  arrTriangles.Push(0);
  arrTriangles.Push(1);
  arrTriangles.Push(3);
  arrTriangles.Push(1);
  arrTriangles.Push(2);
  arrTriangles.Push(3);

  mesh.Clear ();
  mesh.vertices  = arrVertices.ToBuiltin(Vector3) as Vector3[];
  mesh.triangles = arrTriangles.ToBuiltin(int) as int[];
  mesh.Optimize (); //Optimizes the mesh for display.
  mesh.RecalculateNormals (); //Recalculates the normals of the mesh from the triangles and vertices.
}

/*
function Update () {
  // Get instantiated mesh
  var mesh : Mesh = GetComponent(MeshFilter).mesh;
  // Randomly change vertices
  var vertices : Vector3[] = mesh.vertices;
  for (var p : int = 0; p < vertices.Length; p++) {
    vertices[p] += Vector3(0, Random.Range(-0.3, 0.3), 0);
  }
  mesh.vertices = vertices;
  mesh.RecalculateNormals();
}
*/