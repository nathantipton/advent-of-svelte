<script>
  import SantaPopup from "nathans-santa-popup";
</script>

<div class="container mx-auto w-full">
  <h1 class="text-4xl font-bold font-xmas text-primary">Santa's Popup</h1>
  <a
    class="link"
    href="https://www.npmjs.com/package/nathans-santa-popup"
    title="npm package"
    rel="noreferrer"
    >My NPM package
  </a>
  <div>
    <code>npm install -D nathans-santa-popup</code>
  </div>

  <SantaPopup
    delay={3000}
    title="Merry Christmas!"
    message="Santa Claus is coming to town!"
  ></SantaPopup>
</div>
